"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messages_controller_1 = require("../controllers/messages.controller");
const messagesRouter = express_1.default.Router();
messagesRouter.route('/getAllThreadsForUser').post((req, res) => new messages_controller_1.MessagesController().getAllThreadsForUser(req, res));
messagesRouter.route('/startThread').post((req, res) => new messages_controller_1.MessagesController().startThread(req, res));
messagesRouter.route('/sendMessageOffer').post((req, res) => new messages_controller_1.MessagesController().sendMessageOffer(req, res));
messagesRouter.route('/sendMessage').post((req, res) => new messages_controller_1.MessagesController().sendMessage(req, res));
messagesRouter.route('/getThreadById').post((req, res) => new messages_controller_1.MessagesController().getThreadById(req, res));
messagesRouter.route('/readMessage').post((req, res) => new messages_controller_1.MessagesController().readMessage(req, res));
exports.default = messagesRouter;
//# sourceMappingURL=messages.routes.js.map