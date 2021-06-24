"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blocks_controllers_1 = require("../controllers/blocks.controllers");
const blocksRouter = express_1.default.Router();
blocksRouter.route('/blockUnblockUser').post((req, res) => new blocks_controllers_1.BlocksController().blockUnblockUser(req, res));
blocksRouter.route('/isBlocked').post((req, res) => new blocks_controllers_1.BlocksController().isBlocked(req, res));
exports.default = blocksRouter;
//# sourceMappingURL=blocks.routes.js.map