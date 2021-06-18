import express from 'express';
import Fee from '../models/fee';

export class FeesController {

    getFees = (req: express.Request, res: express.Response) => {
        Fee.findOne(
            { 'id': 1 },
            (err, fee) => {
                if (err) console.log(err);
                else res.status(200).json(fee);
            }
        );
    }

    updateFees = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        let rentFee = req.body.id;
        let saleFee = req.body.id;

        Fee.findOneAndUpdate(
            { 'id': id },
            { 'rentFee': rentFee, 'saleFee': saleFee },
            { new: true },
            (err, fee) => {
                if (err) console.log(err);
                else res.status(200).json(fee);
            }
        );
    }
}
