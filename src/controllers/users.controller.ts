import express from 'express';
import User from '../models/user';
import Block from '../models/block';

export class UsersController {
    updateUserInfo = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let city = req.body.city;
        let country = req.body.country;

        User.findOne(
            { 'username': username },
            (err, user) => {
                if (err) console.log(err);
                else {
                    if (user) {
                        User.collection.updateOne({ 'username': username }, { $set: { 'firstname': firstname, 'lastname': lastname, 'city': city, 'country': country } }).then((block) => {
                            res.status(200).json({ 'message': 'user info updated' });
                        }).catch((err) => {
                            console.log(err);
                            res.status(400).json({ 'message': err });
                        });
                    } else {
                        res.status(400).json({ 'message': 'user not found' });
                    }
                }
            }
        );
    }

    updateUserUsername = (req: express.Request, res: express.Response) => {
        let oldUsername = req.body.oldUsername;
        let password = req.body.password;
        let newUsername = req.body.newUsername;

        User.findOne(
            { 'username': oldUsername, 'password': password },
            (err, user) => {
                if (err) console.log(err);
                else {
                    if (user) {
                        User.findOne(
                            { 'username': newUsername },
                            (err, user) => {
                                if (err) console.log(err);
                                else {
                                    if (user) {
                                        res.status(400).json({ 'message': 'username exists' });
                                    } else {
                                        User.collection.updateOne({ 'username': oldUsername, 'password': password }, { $set: { 'username': newUsername } }).then((block) => {
                                            res.status(200).json({ 'message': 'username updated' });
                                        }).catch((err) => {
                                            console.log(err);
                                            res.status(400).json({ 'message': err });
                                        });
                                    }
                                }
                            }
                        )
                    } else {
                        res.status(400).json({ 'message': 'user not found' });
                    }
                }
            }
        );
    }

    updateUserEmail = (req: express.Request, res: express.Response) => {
        let oldEmail = req.body.oldEmail;
        let password = req.body.password;
        let newEmail = req.body.newEmail;

        User.findOne(
            { 'email': oldEmail, 'password': password },
            (err, user) => {
                if (err) console.log(err);
                else {
                    if (user) {
                        User.findOne(
                            { 'email': newEmail },
                            (err, user) => {
                                if (err) console.log(err);
                                else {
                                    if (user) {
                                        res.status(400).json({ 'message': 'email exists' });
                                    } else {
                                        User.collection.updateOne({ 'email': oldEmail, 'password': password }, { $set: { 'email': newEmail } }).then((block) => {
                                            res.status(200).json({ 'message': 'email updated' });
                                        }).catch((err) => {
                                            console.log(err);
                                            res.status(400).json({ 'message': err });
                                        });
                                    }
                                }
                            }
                        )
                    } else {
                        res.status(400).json({ 'message': 'user not found' });
                    }
                }
            }
        );
    }

    answerUserRegistration = (req: express.Request, res: express.Response) => {
        let username = req.body.username
        let accepted = req.body.accepted

        User.findOneAndUpdate(
            { 'username': username },
            { $set: { 'accepted': accepted, 'reviewed': true } },
            (err, user) => {
                if (err) console.log(err);
                else {
                    if (user) {
                        res.status(200).json({ 'message': 'user updated' });
                    } else {
                        res.status(400).json({ 'message': 'user not found' });
                    }
                }
            }
        );
    }

    deleteUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username

        User.findOne(
            { 'username': username },
            (err, user) => {
                if (err) console.log(err);
                else {
                    if (user) {
                        User.collection.deleteOne({ 'username': username }).then((block) => {
                            res.status(200).json({ 'message': 'user deleted' });
                        }).catch((err) => {
                            console.log(err);
                            res.status(400).json({ 'message': err });
                        });
                    } else {
                        res.status(400).json({ 'message': 'user not found' });
                    }
                }
            }
        );
    }

    blockUnblockUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username
        let blockedUsername = req.body.blockedUsername

        Block.findOne(
            { 'username': username, 'blockedUsername': blockedUsername },
            (err, block) => {
                if (err) console.log(err);
                else {
                    if (block) {
                        Block.collection.deleteOne({ 'username': username, 'blockedUsername': blockedUsername }).then((block) => {
                            res.status(200).json({ 'message': 'user unblocked' });
                        }).catch((err) => {
                            console.log(err);
                            res.status(400).json({ 'message': err });
                        });
                    } else {
                        let block = new Block({ 'username': username, 'blockedUsername': blockedUsername });
                        block.save().then((block) => {
                            res.status(200).json({ 'message': 'user blocked' });
                        }).catch((err) => {
                            console.log(err);
                            res.status(400).json({ 'message': err });
                        });
                    }
                }
            }
        );
    }

    getUserByUsername = (req: express.Request, res: express.Response) => {
        let username = req.body.username

        User.findOne(
            { 'username': username },
            (err, user) => {
                if (err) console.log(err)
                else {
                    if (user) {
                        res.status(200).json(user);
                    } else {
                        res.status(400).json({ 'message': 'user not found' });
                    }
                }
            }
        )
    }

    getRegistrationRequests = (req: express.Request, res: express.Response) => {
        User.find(
            { 'reviewed': false },
            (err, users) => {
                if (err) console.log(err);
                else {
                    res.status(200).json(users);
                }
            }
        );
    }

    getAllUsers = (req: express.Request, res: express.Response) => {
        User.find(
            { 'accepted': true },
            (err, users) => {
                if (err) console.log(err);
                else {
                    res.status(200).json(users);
                }
            }
        );
    }
}