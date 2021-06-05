import express from 'express';
import Estate from '../models/estate';

export class EstatesController {
    searchAllEstatesByTitle = (req: express.Request, res: express.Response) => {
        let searchQuery = req.body.searchQuery;

        Estate.find({ 'title': { $regex: searchQuery } },
            (err, estates) => {
                if (err) console.log(err);
                else {
                    res.json(estates);
                }
            })
    }

    searchAllEstatesByCity = (req: express.Request, res: express.Response) => {
        let cityQuery = req.body.cityQuery;

        Estate.find({ 'city': { $regex: cityQuery } },
            (err, estates) => {
                if (err) console.log(err);
                else {
                    res.json(estates);
                }
            })
    }

    searchAllEstatesByPrice = (req: express.Request, res: express.Response) => {
        let rentOrSale = req.body.rentOrSale
        let priceLowerLimit = req.body.priceLowerLimit;
        let priceHigherLimit = req.body.priceHigherLimit;

        if (rentOrSale == 'sale') {
            Estate.find({ 'rentOrSale': 'sale', 'priceToBuy': { $gte: priceLowerLimit, $lte: priceHigherLimit } },
                (err, estates) => {
                    if (err) console.log(err);
                    else {
                        res.json(estates);
                    }
                })
        } else {
            Estate.find({ 'rentOrSale': 'rent', 'priceToRent': { $gte: priceLowerLimit, $lte: priceHigherLimit } },
                (err, estates) => {
                    if (err) console.log(err);
                    else {
                        res.json(estates);
                    }
                })
        }
    }

    getEstateById = (req: express.Request, res: express.Response) => {
        let id = req.body.id;

        Estate.findOne({ 'id': id },
            (err, estate) => {
                if (err) console.log(err);
                else {
                    res.json(estate);
                }
            })
    }

    getPromotedEstates = (req: express.Request, res: express.Response) => {
        Estate.find({ 'promoted': true },
            (err, estates) => {
                if (err) console.log(err);
                else {
                    res.json(estates);
                }
            })
    }
}
