import express from 'express';
import Estate from '../models/estate';
import Offer from '../models/offer';

export class OffersController {

    checkEstateAvailability = (req: express.Request, res: express.Response) => {
        Offer.find(
            { 'estateId': req.body.estateId, 'acceptedByAgent': true, $or: [{ 'dateFrom': { $gte: req.body.dateFrom, $lte: req.body.dateTo } }, { 'dateTo': { $gte: req.body.dateFrom, $lte: req.body.dateTo } }] },
            (err, offers) => {
                if (err) console.log(err);
                else {
                    if (offers.length != 0) {
                        res.status(200).json({ 'message': 'estate is reserved in that period' });
                    } else {
                        res.status(200).json({ 'message': 'estate is available' });
                    }
                }
            }
        )
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
        let id = req.body.id;
        let accepted = req.body.accepted;
        let estateId = req.body.estateId;

        Offer.findOneAndUpdate(
            { 'id': id },
            { $set: { 'acceptedByOwner': accepted, 'reviewedByOwner': true } },
            { new: true },
            (err, offer) => {
                if (err) console.log(err);
                else {
                    if (offer) {
                        if (accepted == true) {
                            Estate.findOne(
                                { 'id': estateId },
                                (err, estate) => {
                                    if (err) console.log(err);
                                    else {
                                        if (estate.get('rentOrSale') == 'sale') {
                                            Offer.updateMany(
                                                { 'estateId': estateId, 'reviewedByOwner': false },
                                                { 'acceptedByOwner': false, 'reviewedByOwner': true }
                                            ).then(() => {
                                                res.status(200).json({ 'message': 'offer answered' });
                                            }).catch((err) => {
                                                res.status(400).json({ 'message': err });
                                            });
                                        } else {
                                            Offer.updateMany(
                                                { 'estateId': estateId, 'reviewedByOwner': false, $or: [{ 'dateFrom': { $gte: offer.get('dateFrom'), $lte: offer.get('dateTo') } }, { 'dateTo': { $gte: offer.get('dateFrom'), $lte: offer.get('dateTo') } }] },
                                                { 'acceptedByOwner': false, 'reviewedByOwner': true }
                                            ).then(() => {
                                                res.status(200).json({ 'message': 'offer answered' });
                                            }).catch((err) => {
                                                res.status(400).json({ 'message': err });
                                            });
                                        }
                                    }
                                }
                            );
                        } else {
                            res.status(200).json({ 'message': 'offer answered' });
                        }
                    } else {
                        res.status(400).json({ 'message': 'offer not found' });
                    }
                }
            }
        );
    }

    answerEstateOfferAgent = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        let accepted = req.body.accepted;
        let estateId = req.body.estateId;

        Offer.findOneAndUpdate(
            { 'id': id },
            { $set: { 'acceptedByOwner': accepted, 'reviewedByOwner': true, 'acceptedByAgent': accepted, 'reviewedByAgent': true } },
            { new: true },
            (err, offer) => {
                if (err) console.log(err);
                else {
                    if (offer) {
                        if (accepted == true) {
                            Estate.findOne(
                                { 'id': estateId },
                                (err, estate) => {
                                    if (err) console.log(err);
                                    else {
                                        if (estate.get('rentOrSale') == 'sale') {
                                            Offer.updateMany(
                                                { 'estateId': estateId, 'reviewedByOwner': false },
                                                { 'acceptedByOwner': false, 'reviewedByOwner': true }
                                            ).then(() => {
                                                res.status(200).json({ 'message': 'offer answered' });
                                            }).catch((err) => {
                                                res.status(400).json({ 'message': err });
                                            });
                                        } else {
                                            Offer.updateMany(
                                                { 'estateId': estateId, 'reviewedByOwner': false, $or: [{ 'dateFrom': { $gte: offer.get('dateFrom'), $lte: offer.get('dateTo') } }, { 'dateTo': { $gte: offer.get('dateFrom'), $lte: offer.get('dateTo') } }] },
                                                { 'acceptedByOwner': false, 'reviewedByOwner': true }
                                            ).then(() => {
                                                res.status(200).json({ 'message': 'offer answered' });
                                            }).catch((err) => {
                                                res.status(400).json({ 'message': err });
                                            });
                                        }
                                    }
                                }
                            );
                        } else {
                            res.status(200).json({ 'message': 'offer answered' });
                        }
                    } else {
                        res.status(400).json({ 'message': 'offer not found' });
                    }
                }
            }
        );
    }

    isOfferActive = (req: express.Request, res: express.Response) => {
        let offerId = req.body.offerId;

        Offer.findOne(
            { 'id': offerId, 'reviewedByOwner': false },
            (err, offer) => {
                if (err) console.log(err);
                else {
                    if (offer) {
                        res.status(200).json({ 'message': 'active offer exists' });
                    } else {
                        res.status(200).json({ 'message': 'active offer doesnt exist' });
                    }
                }
            }
        )
    }

    getAllAgreedOffers = (req: express.Request, res: express.Response) => {
        Offer.find(
            { 'acceptedByOwner': true, 'acceptedByAgent': true },
            (err, offers) => {
                if (err) console.log(err);
                else {
                    res.status(200).json(offers);
                }
            }
        );
    }

    getAllAgencyAgreedOffers = (req: express.Request, res: express.Response) => {
        let agency = req.body.agency;

        Offer.find(
            { 'acceptedByOwner': true, 'acceptedByAgent': true, 'estateOwner': agency },
            (err, offers) => {
                if (err) console.log(err);
                else {
                    res.status(200).json(offers);
                }
            }
        );
    }

    getAllOffersRequests = (req: express.Request, res: express.Response) => {
        Offer.find(
            { 'acceptedByOwner': true, 'reviewedByAgent': false },
            (err, offers) => {
                if (err) console.log(err);
                else {
                    res.status(200).json(offers);
                }
            }
        );
    }

    answerOfferRequest = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        let accepted = req.body.accepted;

        Offer.findOneAndUpdate(
            { 'id': id, 'reviewedByAgent': false, 'acceptedByOwner': true },
            { 'reviewedByAgent': true, 'acceptedByAgent': accepted },
            { new: true },
            (err, offer) => {
                if (err) console.log(err);
                else {
                    res.status(200).json({ 'message': 'offer request answered' });
                }
            }
        )
    }
}