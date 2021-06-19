"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fees_controller_1 = require("../controllers/fees.controller");
const feesRouter = express_1.default.Router();
feesRouter.route('/getFees').post((req, res) => new fees_controller_1.FeesController().getFees(req, res));
feesRouter.route('/updateFees').post((req, res) => new fees_controller_1.FeesController().updateFees(req, res));
exports.default = feesRouter;
//# sourceMappingURL=fees.routes.js.map