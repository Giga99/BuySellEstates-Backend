"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("../controllers/users.controller");
const usersRouter = express_1.default.Router();
usersRouter.route('/updateUserInfo').post((req, res) => new users_controller_1.UsersController().updateUserInfo(req, res));
usersRouter.route('/updateUserUsername').post((req, res) => new users_controller_1.UsersController().updateUserUsername(req, res));
usersRouter.route('/updateUserEmail').post((req, res) => new users_controller_1.UsersController().updateUserEmail(req, res));
usersRouter.route('/answerUserRegistration').post((req, res) => new users_controller_1.UsersController().answerUserRegistration(req, res));
usersRouter.route('/deleteUser').delete((req, res) => new users_controller_1.UsersController().deleteUser(req, res));
usersRouter.route('/blockUnblockUser').post((req, res) => new users_controller_1.UsersController().blockUnblockUser(req, res));
exports.default = usersRouter;
//# sourceMappingURL=users.routes.js.map