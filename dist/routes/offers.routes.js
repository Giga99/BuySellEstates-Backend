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
offersRouter.route('/checkForActiveOffer').post((req, res) => new offers_controller_1.OffersController().checkForActiveOffer(req, res));
exports.default = offersRouter;
//# sourceMappingURL=offers.routes.js.map