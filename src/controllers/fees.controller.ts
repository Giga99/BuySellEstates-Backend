import express from 'express';
import Fee from '../models/fee';

export class FeesController {

    getFees = (req: express.Request, res: express.Response) => {
        let id = req.body.id;

        Fee.findOne(
            { 'id': id },
            (err, fee) => {
                if (err) console.log(err);
                else res.status(200).json(fee);
            }
        );
    }

    updateFees = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        let rentFee = req.body.rentFee;
        let saleFee = req.body.saleFee;

        Fee.findOneAndUpdate(
            { 'id': id },
            { 'rentFee': rentFee, 'saleFee': saleFee },
            { new: true },
            (err, fee) => {
                if (err) console.log(err);
                else res.status(200).json({ 'message': 'Procenti izmenjeni' });
            }
        );
    }
}
