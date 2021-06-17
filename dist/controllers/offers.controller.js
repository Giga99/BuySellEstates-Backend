"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffersController = void 0;
const estate_1 = __importDefault(require("../models/estate"));
const offer_1 = __importDefault(require("../models/offer"));
class OffersController {
    constructor() {
        this.checkEstateAvailability = (req, res) => {
            offer_1.default.find({ 'estateId': req.body.estateId, 'acceptedByOwner': true, $or: [{ 'dateFrom': { $gte: req.body.dateFrom, $lte: req.body.dateTo } }, { 'dateTo': { $gte: req.body.dateFrom, $lte: req.body.dateTo } }] }, (err, offers) => {
                if (err)
                    console.log(err);
                else {
                    if (offers.length != 0) {
                        res.status(200).json({ 'message': 'estate is reserved in that period' });
                    }
                    else {
                        res.status(200).json({ 'message': 'estate is available' });
                    }
                }
            });
        };
        this.sendOffer = (req, res) => {
            offer_1.default.find({}, (err, offers) => {
                if (err)
                    console.log(err);
                else {
                    let id = offers.length + 1;
                    let offer = new offer_1.default(req.body);
                    offer.id = id;
                    offer.save().then(() => {
                        res.status(200).json({ 'offerId': id });
                    }).catch((err) => {
                        console.log(err);
                        res.status(400).json({ 'message': err });
                    });
                }
            });
        };
        this.answerEstateOffer = (req, res) => {
            let id = req.body.id;
            let accepted = req.body.accepted;
            let estateId = req.body.estateId;
            offer_1.default.findOneAndUpdate({ 'id': id }, { $set: { 'acceptedByOwner': accepted, 'reviewedByOwner': true } }, { new: true }, (err, offer) => {
                if (err)
                    console.log(err);
                else {
                    if (offer) {
                        if (accepted == true) {
                            estate_1.default.findOne({ 'id': estateId }, (err, estate) => {
                                if (err)
                                    console.log(err);
                                else {
                                    if (estate.get('rentOrSale') == 'sale') {
                                        offer_1.default.updateMany({ 'estateId': estateId, 'reviewedByOwner': false }, { 'acceptedByOwner': false, 'reviewedByOwner': true }).then(() => {
                                            res.status(200).json({ 'message': 'offer answered' });
                                        }).catch((err) => {
                                            res.status(400).json({ 'message': err });
                                        });
                                    }
                                    else {
                                        offer_1.default.updateMany({ 'estateId': estateId, 'reviewedByOwner': false, $or: [{ 'dateFrom': { $gte: offer.get('dateFrom'), $lte: offer.get('dateTo') } }, { 'dateTo': { $gte: offer.get('dateFrom'), $lte: offer.get('dateTo') } }] }, { 'acceptedByOwner': false, 'reviewedByOwner': true }).then(() => {
                                            res.status(200).json({ 'message': 'offer answered' });
                                        }).catch((err) => {
                                            res.status(400).json({ 'message': err });
                                        });
                                    }
                                }
                            });
                        }
                        else {
                            res.status(200).json({ 'message': 'offer answered' });
                        }
                    }
                    else {
                        res.status(400).json({ 'message': 'offer not found' });
                    }
                }
            });
        };
        this.answerEstateOfferAgent = (req, res) => {
            let id = req.body.id;
            let accepted = req.body.accepted;
            let estateId = req.body.estateId;
            offer_1.default.findOneAndUpdate({ 'id': id }, { $set: { 'acceptedByOwner': accepted, 'reviewedByOwner': true, 'acceptedByAgent': accepted, 'reviewedByAgent': true } }, { new: true }, (err, offer) => {
                if (err)
                    console.log(err);
                else {
                    if (offer) {
                        if (accepted == true) {
                            estate_1.default.findOne({ 'id': estateId }, (err, estate) => {
                                if (err)
                                    console.log(err);
                                else {
                                    if (estate.get('rentOrSale') == 'sale') {
                                        offer_1.default.updateMany({ 'estateId': estateId, 'reviewedByOwner': false }, { 'acceptedByOwner': false, 'reviewedByOwner': true }).then(() => {
                                            res.status(200).json({ 'message': 'offer answered' });
                                        }).catch((err) => {
                                            res.status(400).json({ 'message': err });
                                        });
                                    }
                                    else {
                                        offer_1.default.updateMany({ 'estateId': estateId, 'reviewedByOwner': false, $or: [{ 'dateFrom': { $gte: offer.get('dateFrom'), $lte: offer.get('dateTo') } }, { 'dateTo': { $gte: offer.get('dateFrom'), $lte: offer.get('dateTo') } }] }, { 'acceptedByOwner': false, 'reviewedByOwner': true }).then(() => {
                                            res.status(200).json({ 'message': 'offer answered' });
                                        }).catch((err) => {
                                            res.status(400).json({ 'message': err });
                                        });
                                    }
                                }
                            });
                        }
                        else {
                            res.status(200).json({ 'message': 'offer answered' });
                        }
                    }
                    else {
                        res.status(400).json({ 'message': 'offer not found' });
                    }
                }
            });
        };
        this.isOfferActive = (req, res) => {
            let offerId = req.body.offerId;
            offer_1.default.findOne({ 'id': offerId, 'reviewedByOwner': false }, (err, offer) => {
                if (err)
                    console.log(err);
                else {
                    if (offer) {
                        res.status(200).json({ 'message': 'active offer exists' });
                    }
                    else {
                        res.status(200).json({ 'message': 'active offer doesnt exist' });
                    }
                }
            });
        };
        this.getAllAgreedOffers = (req, res) => {
            offer_1.default.find({ 'acceptedByOwner': true, 'acceptedByAgent': true }, (err, offers) => {
                if (err)
                    console.log(err);
                else {
                    // console.log(offers);
                    let buys = offers.filter((offer) => {
                        // console.log("filter");
                        return offer.get('dateFrom') == '-1';
                        // Estate.findOne(
                        //     { 'id': offer.get('estateId') },
                        //     (err, estate) => {
                        //         if (err) console.log(err);
                        //         else {
                        //             if (estate) {
                        //                 if (estate.get('rentOrSale') == 'sale') buys.push(offer);
                        //             }
                        //         }
                        //     }
                        // )
                    });
                    res.status(200).json(buys);
                }
            });
        };
        this.getAllAgencyAgreedOffers = (req, res) => {
            let agency = req.body.agency;
            offer_1.default.find({ 'acceptedByOwner': true, 'acceptedByAgent': true, 'estateOwner': agency }, (err, offers) => {
                if (err)
                    console.log(err);
                else {
                    res.status(200).json(offers);
                }
            });
        };
    }
}
exports.OffersController = OffersController;
//# sourceMappingURL=offers.controller.js.map