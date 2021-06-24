"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const user_1 = __importDefault(require("../models/user"));
class UsersController {
    constructor() {
        this.updateUserInfo = (req, res) => {
            let username = req.body.username;
            let firstname = req.body.firstname;
            let lastname = req.body.lastname;
            let city = req.body.city;
            let country = req.body.country;
            let profileImage = req.body.profileImage;
            user_1.default.findOne({ 'username': username }, (err, user) => {
                if (err)
                    console.log(err);
                else {
                    if (user) {
                        user_1.default.collection.updateOne({ 'username': username }, { $set: { 'firstname': firstname, 'lastname': lastname, 'city': city, 'country': country, 'profileImage': profileImage } }).then((block) => {
                            res.status(200).json({ 'message': 'user info updated' });
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
        this.updateUserUsername = (req, res) => {
            let oldUsername = req.body.oldUsername;
            let password = req.body.password;
            let newUsername = req.body.newUsername;
            user_1.default.findOne({ 'username': oldUsername, 'password': password }, (err, user) => {
                if (err)
                    console.log(err);
                else {
                    if (user) {
                        user_1.default.findOne({ 'username': newUsername }, (err, user) => {
                            if (err)
                                console.log(err);
                            else {
                                if (user) {
                                    res.status(400).json({ 'message': 'username exists' });
                                }
                                else {
                                    user_1.default.collection.updateOne({ 'username': oldUsername, 'password': password }, { $set: { 'username': newUsername } }).then((block) => {
                                        res.status(200).json({ 'message': 'username updated' });
                                    }).catch((err) => {
                                        console.log(err);
                                        res.status(400).json({ 'message': err });
                                    });
                                }
                            }
                        });
                    }
                    else {
                        res.status(400).json({ 'message': 'user not found' });
                    }
                }
            });
        };
        this.updateUserEmail = (req, res) => {
            let oldEmail = req.body.oldEmail;
            let password = req.body.password;
            let newEmail = req.body.newEmail;
            user_1.default.findOne({ 'email': oldEmail, 'password': password }, (err, user) => {
                if (err)
                    console.log(err);
                else {
                    if (user) {
                        user_1.default.findOne({ 'email': newEmail }, (err, user) => {
                            if (err)
                                console.log(err);
                            else {
                                if (user) {
                                    res.status(400).json({ 'message': 'email exists' });
                                }
                                else {
                                    user_1.default.collection.updateOne({ 'email': oldEmail, 'password': password }, { $set: { 'email': newEmail } }).then((block) => {
                                        res.status(200).json({ 'message': 'email updated' });
                                    }).catch((err) => {
                                        console.log(err);
                                        res.status(400).json({ 'message': err });
                                    });
                                }
                            }
                        });
                    }
                    else {
                        res.status(400).json({ 'message': 'user not found' });
                    }
                }
            });
        };
        this.answerUserRegistration = (req, res) => {
            let username = req.body.username;
            let accepted = req.body.accepted;
            user_1.default.findOneAndUpdate({ 'username': username }, { $set: { 'accepted': accepted, 'reviewed': true } }, (err, user) => {
                if (err)
                    console.log(err);
                else {
                    if (user) {
                        res.status(200).json({ 'message': 'user updated' });
                    }
                    else {
                        res.status(400).json({ 'message': 'user not found' });
                    }
                }
            });
        };
        this.deleteUser = (req, res) => {
            let username = req.body.username;
            user_1.default.findOne({ 'username': username }, (err, user) => {
                if (err)
                    console.log(err);
                else {
                    if (user) {
                        user_1.default.collection.deleteOne({ 'username': username }).then((block) => {
                            res.status(200).json({ 'message': 'user deleted' });
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
        this.getUserByUsername = (req, res) => {
            let username = req.body.username;
            user_1.default.findOne({ 'username': username }, (err, user) => {
                if (err)
                    console.log(err);
                else {
                    if (user) {
                        res.status(200).json(user);
                    }
                    else {
                        res.status(400).json({ 'message': 'user not found' });
                    }
                }
            });
        };
        this.getRegistrationRequests = (req, res) => {
            user_1.default.find({ 'reviewed': false }, (err, users) => {
                if (err)
                    console.log(err);
                else {
                    res.status(200).json(users);
                }
            });
        };
        this.getAllUsers = (req, res) => {
            user_1.default.find({ 'accepted': true }, (err, users) => {
                if (err)
                    console.log(err);
                else {
                    res.status(200).json(users);
                }
            });
        };
    }
}
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map