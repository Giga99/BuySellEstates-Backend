import express from 'express';
import Estate from '../models/estate';

export class EstatesController {
    searchAllEstatesByTitle = (req: express.Request, res: express.Response) => {
        let searchQuery = req.body.searchQuery;

        Estate.find(
            { 'title': { $regex: searchQuery }, 'approved': true },
            (err, estates) => {
                if (err) console.log(err);
                else {
                    res.status(200).json(estates);
                }
            }
        )
    }

    searchAllEstatesByCity = (req: express.Request, res: express.Response) => {
        let cityQuery = req.body.cityQuery;

        Estate.find(
            { 'city': { $regex: cityQuery }, 'approved': true },
            (err, estates) => {
                if (err) console.log(err);
                else {
                    res.status(200).json(estates);
                }
            }
        )
    }

    searchAllEstatesByPrice = (req: express.Request, res: express.Response) => {
        let rentOrSale = req.body.rentOrSale
        let priceLowerLimit = req.body.priceLowerLimit;
        let priceHigherLimit = req.body.priceHigherLimit;

        if (rentOrSale == 'sale') {
            Estate.find(
                { 'rentOrSale': 'sale', 'priceToBuy': { $gte: priceLowerLimit, $lte: priceHigherLimit }, 'approved': true },
                (err, estates) => {
                    if (err) console.log(err);
                    else {
                        res.status(200).json(estates);
                    }
                }
            )
        } else {
            Estate.find(
                { 'rentOrSale': 'rent', 'priceToRent': { $gte: priceLowerLimit, $lte: priceHigherLimit }, 'approved': true },
                (err, estates) => {
                    if (err) console.log(err);
                    else {
                        res.status(200).json(estates);
                    }
                }
            )
        }
    }

    getEstateById = (req: express.Request, res: express.Response) => {
        let id = req.body.id;

        Estate.findOne(
            { 'id': id },
            (err, estate) => {
                if (err) console.log(err);
                else {
                    res.status(200).json(estate);
                }
            }
        )
    }

    getPromotedEstates = (req: express.Request, res: express.Response) => {
        Estate.find({ 'promoted': true, 'approved': true },
            (err, estates) => {
                if (err) console.log(err);
                else {
                    res.status(200).json(estates);
                }
            })
    }

    getUserEstates = (req: express.Request, res: express.Response) => {
        let ownerUsername = req.body.ownerUsername;

        Estate.find({ 'ownerUsername': ownerUsername },
            (err, estates) => {
                if (err) console.log(err);
                else {
                    res.status(200).json(estates);
                }
            })
    }

    addEstate = (req: express.Request, res: express.Response) => {
        Estate.find({}, (err, etates) => {
            if (err) console.log(err);
            else {
                let id = etates.length + 1;
                let estate = new Estate(req.body);
                estate.id = id;
                estate.save().then(() => {
                    res.status(200).json({ 'message': 'estate added' });
                }).catch((err) => {
                    console.log(err);
                    res.status(400).json({ 'message': err });
                });
            }
        })
    }

    editEstate = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        let title = req.body.title;
        let municipality = req.body.municipality;
        let city = req.body.city;
        let address = req.body.address;
        let priceToBuy = req.body.priceToBuy
        let priceToRent = req.body.priceToRent;
        let squareFootage = req.body.squareFootage;
        let rentOrSale = req.body.rentOrSale;
        let numberOfFloors = req.body.numberOfFloors;
        let floorNumber = req.body.floorNumber;
        let numberOfRooms = req.body.numberOfRooms;
        let furnished = req.body.furnished;

        Estate.findOneAndUpdate(
            { 'id': id },
            {
                $set: {
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
                }
            },
            (err, estate) => {
                if (err) console.log(err);
                else {
                    if (estate) {
                        res.status(200).json({ 'message': 'estate updated' });
                    } else {
                        res.status(400).json({ 'message': 'estate not found' });
                    }
                }
            }
        );
    }

    answerEstateAdding = (req: express.Request, res: express.Response) => {
        let id = req.body.id
        let approved = req.body.approved

        Estate.findOne(
            { 'id': id },
            (err, estate) => {
                if (err) console.log(err);
                else {
                    if (estate) {
                        Estate.collection.updateOne({ 'id': id }, { $set: { 'approved': approved, 'reviewed': true } }).then((block) => {
                            res.status(200).json({ 'message': 'estate updated' });
                        }).catch((err) => {
                            console.log(err);
                            res.status(400).json({ 'message': err });
                        });
                    } else {
                        res.status(400).json({ 'message': 'estate not found' });
                    }
                }
            }
        );
    }
}
