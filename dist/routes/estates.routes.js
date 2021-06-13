"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const estates_controller_1 = require("../controllers/estates.controller");
const estatesRouter = express_1.default.Router();
estatesRouter.route('/searchAllEstatesByTitle').post((req, res) => new estates_controller_1.EstatesController().searchAllEstatesByTitle(req, res));
estatesRouter.route('/searchAllEstatesByCity').post((req, res) => new estates_controller_1.EstatesController().searchAllEstatesByCity(req, res));
estatesRouter.route('/searchAllEstatesByPrice').post((req, res) => new estates_controller_1.EstatesController().searchAllEstatesByPrice(req, res));
estatesRouter.route('/getEstateById').post((req, res) => new estates_controller_1.EstatesController().getEstateById(req, res));
estatesRouter.route('/getPromotedEstates').get((req, res) => new estates_controller_1.EstatesController().getPromotedEstates(req, res));
estatesRouter.route('/getUserEstates').post((req, res) => new estates_controller_1.EstatesController().getUserEstates(req, res));
estatesRouter.route('/addEstate').post((req, res) => new estates_controller_1.EstatesController().addEstate(req, res));
estatesRouter.route('/editEstate').post((req, res) => new estates_controller_1.EstatesController().editEstate(req, res));
estatesRouter.route('/answerEstateAdding').post((req, res) => new estates_controller_1.EstatesController().answerEstateAdding(req, res));
exports.default = estatesRouter;
//# sourceMappingURL=estates.routes.js.map