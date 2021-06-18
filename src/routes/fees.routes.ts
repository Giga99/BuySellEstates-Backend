import express from 'express';
import { FeesController } from '../controllers/fees.controller';
const feesRouter = express.Router();

feesRouter.route('/getFees').post(
    (req, res) => new FeesController().getFees(req, res)
);

feesRouter.route('/updateFees').post(
    (req, res) => new FeesController().updateFees(req, res)
);

export default feesRouter;