import express from 'express';
import Block from '../models/block';

export class BlocksController {

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

    isBlocked = (req: express.Request, res: express.Response) => {
        let username1 = req.body.username1
        let username2 = req.body.username2

        Block.findOne(
            { 'username': username1, 'blockedUsername': username2 },
            (err, block) => {
                if (err) console.log(err);
                else {
                    if (block) {
                        res.status(200).json({ 'message': 'user blocked' });
                    } else {
                        Block.findOne(
                            { 'username': username2, 'blockedUsername': username1 },
                            (err, block) => {
                                if (err) console.log(err);
                                else {
                                    if(block) {
                                        res.status(200).json({ 'message': 'user is blocked' });
                                    } else {
                                        res.status(200).json({ 'message': 'ok' });
                                    }
                                }
                            }
                        );
                    }
                }
            }
        );
    }
}