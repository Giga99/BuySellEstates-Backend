import express from 'express';
import { EstatesController } from '../controllers/estates.controller';
const estatesRouter = express.Router();

estatesRouter.route('/searchAllEstatesByTitle').post(
    (req, res) => new EstatesController().searchAllEstatesByTitle(req, res)
);

estatesRouter.route('/searchAllEstatesByCity').post(
    (req, res) => new EstatesController().searchAllEstatesByCity(req, res)
);

estatesRouter.route('/searchAllEstatesByPrice').post(
    (req, res) => new EstatesController().searchAllEstatesByPrice(req, res)
);

estatesRouter.route('/getEstateById').post(
    (req, res) => new EstatesController().getEstateById(req, res)
);

estatesRouter.route('/getPromotedEstates').get(
    (req, res) => new EstatesController().getPromotedEstates(req, res)
);

estatesRouter.route('/getUserEstates').post(
    (req, res) => new EstatesController().getUserEstates(req, res)
);

estatesRouter.route('/addEstate').post(
    (req, res) => new EstatesController().addEstate(req, res)
);

estatesRouter.route('/updateEstate').post(
    (req, res) => new EstatesController().updateEstate(req, res)
);

estatesRouter.route('/answerEstateAdding').post(
    (req, res) => new EstatesController().answerEstateAdding(req, res)
);

export default estatesRouter;
