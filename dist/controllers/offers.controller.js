"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffersController = void 0;
const offer_1 = __importDefault(require("../models/offer"));
class OffersController {
    constructor() {
        this.checkEstateAvailability = (req, res) => {
            offer_1.default.find({ 'estateId': req.body.estateId, 'acceptedByOwner': true, $or: { 'dateFrom': { $gte: req.body.dateFrom, $lte: req.body.dateTo }, 'dateTo': { $gte: req.body.dateFrom, $lte: req.body.dateTo } } }, (err, offers) => {
                if (err)
                    console.log(err);
                else {
                    if (offers) {
                        res.status(404).json({ 'message': 'estate is reserved in that period' });
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
            offer_1.default.findOneAndUpdate({ 'id': id }, { $set: { 'acceptedByOwner': accepted, 'reviewedByOwner': true } }, (err, offer) => {
                if (err)
                    console.log(err);
                else {
                    if (offer) {
                        res.status(200).json({ 'message': 'offer answered' });
                    }
                    else {
                        res.status(400).json({ 'message': 'offer not found' });
                    }
                }
            });
        };
    }
}
exports.OffersController = OffersController;
//# sourceMappingURL=offers.controller.js.map