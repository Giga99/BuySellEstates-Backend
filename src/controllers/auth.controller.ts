import express from 'express';
import User from '../models/user';

export class AuthController {
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;
        let userType = req.body.userType;

        User.findOne(
            { 'username': username, 'password': password, 'userType': userType },
            (err, user) => {
                if (err) console.log(err);
                else res.status(200).json(user);
            }
        );
    }

    register = (req: express.Request, res: express.Response) => {
        let user = new User(req.body);
        
        user.save().then((user) => {
            res.status(200).json({ 'message': 'user added' });
        }).catch((err) => {
            console.log(err);
            res.status(400).json({ 'message': err });
        });
    }

    changePassword = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let oldPassword = req.body.oldPassword;
        let newPassword = req.body.newPassword;

        User.findOne(
            { 'username': username, 'password': oldPassword },
            (err, user) => {
                if (err) console.log(err);
                else {
                    if (user) {
                        User.collection.updateOne({ 'username': username }, { $set: { 'password': newPassword } }).then((block) => {
                            res.status(200).json({ 'message': 'password updated' });
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
}
