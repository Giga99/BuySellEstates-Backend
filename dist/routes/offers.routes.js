"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const offers_controller_1 = require("../controllers/offers.controller");
const offersRouter = express_1.default.Router();
offersRouter.route('/checkEstateAvailability').post((req, res) => new offers_controller_1.OffersController().checkEstateAvailability(req, res));
offersRouter.route('/sendOffer').post((req, res) => new offers_controller_1.OffersController().sendOffer(req, res));
offersRouter.route('/answerEstateOffer').post((req, res) => new offers_controller_1.OffersController().answerEstateOffer(req, res));
offersRouter.route('/answerEstateOfferAgent').post((req, res) => new offers_controller_1.OffersController().answerEstateOfferAgent(req, res));
offersRouter.route('/isOfferActive').post((req, res) => new offers_controller_1.OffersController().isOfferActive(req, res));
offersRouter.route('/getAllAgreedOffers').get((req, res) => new offers_controller_1.OffersController().getAllAgreedOffers(req, res));
offersRouter.route('/getAllAgencyAgreedOffers').post((req, res) => new offers_controller_1.OffersController().getAllAgencyAgreedOffers(req, res));
offersRouter.route('/getAllOffersRequests').get((req, res) => new offers_controller_1.OffersController().getAllOffersRequests(req, res));
offersRouter.route('/answerOfferRequest').post((req, res) => new offers_controller_1.OffersController().answerOfferRequest(req, res));
exports.default = offersRouter;
//# sourceMappingURL=offers.routes.js.map