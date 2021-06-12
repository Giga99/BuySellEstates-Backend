"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstatesController = void 0;
const estate_1 = __importDefault(require("../models/estate"));
class EstatesController {
    constructor() {
        this.searchAllEstatesByTitle = (req, res) => {
            let searchQuery = req.body.searchQuery;
            estate_1.default.find({ 'title': { $regex: searchQuery }, 'approved': true }, (err, estates) => {
                if (err)
                    console.log(err);
                else {
                    res.status(200).json(estates);
                }
            });
        };
        this.searchAllEstatesByCity = (req, res) => {
            let cityQuery = req.body.cityQuery;
            estate_1.default.find({ 'city': { $regex: cityQuery }, 'approved': true }, (err, estates) => {
                if (err)
                    console.log(err);
                else {
                    res.status(200).json(estates);
                }
            });
        };
        this.searchAllEstatesByPrice = (req, res) => {
            let rentOrSale = req.body.rentOrSale;
            let priceLowerLimit = req.body.priceLowerLimit;
            let priceHigherLimit = req.body.priceHigherLimit;
            if (rentOrSale == 'sale') {
                estate_1.default.find({ 'rentOrSale': 'sale', 'priceToBuy': { $gte: priceLowerLimit, $lte: priceHigherLimit }, 'approved': true }, (err, estates) => {
                    if (err)
                        console.log(err);
                    else {
                        res.status(200).json(estates);
                    }
                });
            }
            else {
                estate_1.default.find({ 'rentOrSale': 'rent', 'priceToRent': { $gte: priceLowerLimit, $lte: priceHigherLimit }, 'approved': true }, (err, estates) => {
                    if (err)
                        console.log(err);
                    else {
                        res.status(200).json(estates);
                    }
                });
            }
        };
        this.getEstateById = (req, res) => {
            let id = req.body.id;
            estate_1.default.findOne({ 'id': id }, (err, estate) => {
                if (err)
                    console.log(err);
                else {
                    res.status(200).json(estate);
                }
            });
        };
        this.getPromotedEstates = (req, res) => {
            estate_1.default.find({ 'promoted': true, 'approved': true }, (err, estates) => {
                if (err)
                    console.log(err);
                else {
                    res.status(200).json(estates);
                }
            });
        };
        this.getUserEstates = (req, res) => {
            let ownerUsername = req.body.ownerUsername;
            estate_1.default.find({ 'ownerUsername': ownerUsername }, (err, estates) => {
                if (err)
                    console.log(err);
                else {
                    res.status(200).json(estates);
                }
            });
        };
        this.addEstate = (req, res) => {
            let estate = new estate_1.default(req.body);
            estate['id'] = 8;
            estate.save().then(() => {
                res.status(200).json({ 'message': 'estate added' });
            }).catch((err) => {
                console.log(err);
                res.status(400).json({ 'message': err });
            });
        };
        this.updateEstate = (req, res) => {
            let id = req.body.id;
            let title = req.body.title;
            let municipality = req.body.municipality;
            let city = req.body.city;
            let address = req.body.address;
            let priceToBuy = req.body.priceToBuy;
            let priceToRent = req.body.priceToRent;
            let squareFootage = req.body.squareFootage;
            let rentOrSale = req.body.rentOrSale;
            let numberOfFloors = req.body.numberOfFloors;
            let floorNumber = req.body.floorNumber;
            let numberOfRooms = req.body.rentOrSale;
            let furnished = req.body.numberOfFloors;
            estate_1.default.findOne({ 'id': id }, (err, estate) => {
                if (err)
                    console.log(err);
                else {
                    if (estate) {
                        estate_1.default.collection.updateOne({ 'id': id }, { $set: {
                                'title': title,
                                'municipality': municipality,
                                'city': city,
                                'address': address,
                                'priceToBuy': priceToBuy,
                                'priceToRent': priceToRent,
                                'squareFootage': squareFootage,
                                'rentOrSale': rentOrSale,
                                'numberOfFloors': numberOfFloors,
                                'floorNumber': floorNumber,
                                'numberOfRooms': numberOfRooms,
                                'furnished': furnished
                            } }).then((block) => {
                            res.status(200).json({ 'message': 'estate updated' });
                        }).catch((err) => {
                            console.log(err);
                            res.status(400).json({ 'message': err });
                        });
                    }
                    else {
                        res.status(400).json({ 'message': 'estate not found' });
                    }
                }
            });
        };
        this.answerEstateAdding = (req, res) => {
            let id = req.body.id;
            let approved = req.body.approved;
            estate_1.default.findOne({ 'id': id }, (err, estate) => {
                if (err)
                    console.log(err);
                else {
                    if (estate) {
                        estate_1.default.collection.updateOne({ 'id': id }, { $set: { 'approved': approved, 'reviewed': true } }).then((block) => {
                            res.status(200).json({ 'message': 'estate updated' });
                        }).catch((err) => {
                            console.log(err);
                            res.status(400).json({ 'message': err });
                        });
                    }
                    else {
                        res.status(400).json({ 'message': 'estate not found' });
                    }
                }
            });
        };
    }
}
exports.EstatesController = EstatesController;
//# sourceMappingURL=estates.controller.js.map