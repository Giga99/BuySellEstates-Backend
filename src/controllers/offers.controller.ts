import express from 'express';
import Offer from '../models/offer';

export class OffersController {

    checkEstateAvailability = (req: express.Request, res: express.Response) => {
        Offer.find({ 'estateId': req.body.estateId, 'acceptedByOwner': true, $or: { 'dateFrom': { $gte: req.body.dateFrom, $lte: req.body.dateTo }, 'dateTo': { $gte: req.body.dateFrom, $lte: req.body.dateTo } } }, (err, offers) => {
            if (err) console.log(err);
            else {
                if (offers) {
                    res.status(404).json({ 'message': 'estate is reserved in that period' });
                } else {
                    res.status(200).json({ 'message': 'estate is available' });
                }
            }
        })
    }

    sendOffer = (req: express.Request, res: express.Response) => {
        Offer.find({}, (err, offers) => {
            if (err) console.log(err);
            else {
                let id = offers.length + 1;
                let offer = new Offer(req.body);
                offer.id = id;
                offer.save().then(() => {
                    res.status(200).json({ 'offerId': id });
                }).catch((err) => {
                    console.log(err);
                    res.status(400).json({ 'message': err });
                });
            }
        });
    }


    answerEstateOffer = (req: express.Request, res: express.Response) => {
        let id = req.body.id
        let accepted = req.body.accepted

        Offer.findOneAndUpdate(
            { 'id': id },
            { $set: { 'acceptedByOwner': accepted, 'reviewedByOwner': true } },
            (err, offer) => {
                if (err) console.log(err);
                else {
                    if (offer) {
                        res.status(200).json({ 'message': 'offer answered' });
                    } else {
                        res.status(400).json({ 'message': 'offer not found' });
                    }
                }
            }
        );
    }
}