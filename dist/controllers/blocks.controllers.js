"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlocksController = void 0;
const block_1 = __importDefault(require("../models/block"));
class BlocksController {
    constructor() {
        this.blockUnblockUser = (req, res) => {
            let username = req.body.username;
            let blockedUsername = req.body.blockedUsername;
            block_1.default.findOne({ 'username': username, 'blockedUsername': blockedUsername }, (err, block) => {
                if (err)
                    console.log(err);
                else {
                    if (block) {
                        block_1.default.collection.deleteOne({ 'username': username, 'blockedUsername': blockedUsername }).then((block) => {
                            res.status(200).json({ 'message': 'user unblocked' });
                        }).catch((err) => {
                            console.log(err);
                            res.status(400).json({ 'message': err });
                        });
                    }
                    else {
                        let block = new block_1.default({ 'username': username, 'blockedUsername': blockedUsername });
                        block.save().then((block) => {
                            res.status(200).json({ 'message': 'user blocked' });
                        }).catch((err) => {
                            console.log(err);
                            res.status(400).json({ 'message': err });
                        });
                    }
                }
            });
        };
        this.isBlocked = (req, res) => {
            let username1 = req.body.username1;
            let username2 = req.body.username2;
            block_1.default.findOne({ 'username': username1, 'blockedUsername': username2 }, (err, block) => {
                if (err)
                    console.log(err);
                else {
                    if (block) {
                        res.status(200).json({ 'message': 'user blocked' });
                    }
                    else {
                        block_1.default.findOne({ 'username': username2, 'blockedUsername': username1 }, (err, block) => {
                            if (err)
                                console.log(err);
                            else {
                                if (block) {
                                    res.status(200).json({ 'message': 'user is blocked' });
                                }
                                else {
                                    res.status(200).json({ 'message': 'ok' });
                                }
                            }
                        });
                    }
                }
            });
        };
    }
}
exports.BlocksController = BlocksController;
//# sourceMappingURL=blocks.controllers.js.map