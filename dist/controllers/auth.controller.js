"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const user_1 = __importDefault(require("../models/user"));
class AuthController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let userType = req.body.userType;
            user_1.default.findOne({ 'username': username, 'password': password, 'userType': userType }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.status(200).json(user);
            });
        };
        this.register = (req, res) => {
            let user = new user_1.default(req.body);
            user_1.default.find({ 'username': req.body.username }, (err, users) => {
                if (users.length == 0) {
                    user_1.default.find({ 'email': req.body.email }, (err, users) => {
                        if (users.length == 0) {
                            user.save().then((user) => {
                                res.status(200).json({ 'message': 'user added' });
                            }).catch((err) => {
                                console.log(err);
                                res.status(200).json({ 'message': err });
                            });
                        }
                        else {
                            res.status(200).json({ 'message': 'email exist' });
                        }
                    });
                }
                else {
                    res.status(200).json({ 'message': 'username exist' });
                }
            });
        };
        this.changePassword = (req, res) => {
            let username = req.body.username;
            let oldPassword = req.body.oldPassword;
            let newPassword = req.body.newPassword;
            user_1.default.findOne({ 'username': username, 'password': oldPassword }, (err, user) => {
                if (err)
                    console.log(err);
                else {
                    if (user) {
                        user_1.default.collection.updateOne({ 'username': username }, { $set: { 'password': newPassword } }).then((block) => {
                            res.status(200).json({ 'message': 'password updated' });
                        }).catch((err) => {
                            console.log(err);
                            res.status(400).json({ 'message': err });
                        });
                    }
                    else {
                        res.status(400).json({ 'message': 'user not found' });
                    }
                }
            });
        };
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map