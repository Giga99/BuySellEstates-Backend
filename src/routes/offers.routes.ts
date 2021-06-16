import express from 'express';
import { OffersController } from '../controllers/offers.controller';
const offersRouter = express.Router();

offersRouter.route('/checkEstateAvailability').post(
    (req, res) => new OffersController().checkEstateAvailability(req, res)
);

offersRouter.route('/sendOffer').post(
    (req, res) => new OffersController().sendOffer(req, res)
);

offersRouter.route('/answerEstateOffer').post(
    (req, res) => new OffersController().answerEstateOffer(req, res)
);

offersRouter.route('/answerEstateOfferAgent').post(
    (req, res) => new OffersController().answerEstateOfferAgent(req, res)
);

offersRouter.route('/isOfferActive').post(
    (req, res) => new OffersController().isOfferActive(req, res)
);

export default offersRouter;
