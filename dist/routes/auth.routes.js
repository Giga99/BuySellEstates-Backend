"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const authRouter = express_1.default.Router();
authRouter.route('/login').post((req, res) => new auth_controller_1.AuthController().login(req, res));
authRouter.route('/register').post((req, res) => new auth_controller_1.AuthController().register(req, res));
authRouter.route('/changePassword').post((req, res) => new auth_controller_1.AuthController().changePassword(req, res));
exports.default = authRouter;
//# sourceMappingURL=auth.routes.js.map