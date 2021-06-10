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
            estate_1.default.find({ 'title': { $regex: searchQuery } }, (err, estates) => {
                if (err)
                    console.log(err);
                else {
                    res.json(estates);
                }
            });
        };
        this.searchAllEstatesByCity = (req, res) => {
            let cityQuery = req.body.cityQuery;
            estate_1.default.find({ 'city': { $regex: cityQuery } }, (err, estates) => {
                if (err)
                    console.log(err);
                else {
                    res.json(estates);
                }
            });
        };
        this.searchAllEstatesByPrice = (req, res) => {
            let rentOrSale = req.body.rentOrSale;
            let priceLowerLimit = req.body.priceLowerLimit;
            let priceHigherLimit = req.body.priceHigherLimit;
            if (rentOrSale == 'sale') {
                estate_1.default.find({ 'rentOrSale': 'sale', 'priceToBuy': { $gte: priceLowerLimit, $lte: priceHigherLimit } }, (err, estates) => {
                    if (err)
                        console.log(err);
                    else {
                        res.json(estates);
                    }
                });
            }
            else {
                estate_1.default.find({ 'rentOrSale': 'rent', 'priceToRent': { $gte: priceLowerLimit, $lte: priceHigherLimit } }, (err, estates) => {
                    if (err)
                        console.log(err);
                    else {
                        res.json(estates);
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
                    res.json(estate);
                }
            });
        };
        this.getPromotedEstates = (req, res) => {
            estate_1.default.find({ 'promoted': true }, (err, estates) => {
                if (err)
                    console.log(err);
                else {
                    res.json(estates);
                }
            });
        };
    }
}
exports.EstatesController = EstatesController;
//# sourceMappingURL=estates.controller.js.map