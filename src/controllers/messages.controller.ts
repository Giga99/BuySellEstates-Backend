import express from 'express';
import Thread from '../models/thread';

export class MessagesController {

    getAllThreadsForUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        Thread.find({ $or: [{ 'user1': username }, { 'user2': username }] })
            .sort({ lastMessageDate: -1 }).then((estates) => {
                res.status(200).json(estates);
            }).catch((err) => {
                console.log(err);
            });
    }

    startThread = (req: express.Request, res: express.Response) => {
        let estateId = req.body.estateId;
        let user1 = req.body.user1;
        let user2 = req.body.user2;

        Thread.findOne({ 'estateId': estateId, $or: [{ $and: [{ 'user1': user1 }, { 'user2': user2 }] }, { $and: [{ 'user1': user2 }, { 'user2': user1 }] }] }, (err, thread) => {
            if (err) console.log(err);
            else {
                if (thread) {
                    res.status(200).json({ 'id': thread.id });
                } else {
                    Thread.find({}, (err, threads) => {
                        if (err) console.log(err);
                        else {
                            let id = threads.length + 1;
                            let thread = new Thread(req.body);
                            thread.id = id;
                            thread.save().then(() => {
                                res.status(200).json({ 'id': id });
                            }).catch((err) => {
                                console.log(err);
                                res.status(400).json({ 'message': err });
                            });
                        }
                    });
                }
            }
        })
    }

    sendMessageOffer = (req: express.Request, res: express.Response) => {
        let threadId = req.body.threadId;
        let text = req.body.text;
        let sender = req.body.sender;
        let date = req.body.date;
        let dateFrom = req.body.dateFrom;
        let dateTo = req.body.dateTo;
        let offerId = req.body.offerId;

        Thread.findOneAndUpdate(
            { 'id': threadId },
            { $set: { 'read': false, 'lastMessageDate': date } },
            { new: true },
            (err, thread) => {
                if (err) console.log(err);
                else {
                    if (thread) {
                        let message = {
                            id: thread.get('messages').length + 1,
                            text: text,
                            sender: sender,
                            date: date,
                            isOffer: true,
                            dateFrom: dateFrom,
                            dateTo: dateTo,
                            offerId: offerId
                        }
                        Thread.updateOne({ 'id': threadId }, { $push: { 'messages': message } }).then(() => {
                            res.status(200).json({ 'message': 'message offer sent' });
                        }).catch((err) => {
                            res.status(400).json({ 'message': err });
                        })
                    } else {
                        res.status(400).json({ 'message': 'thread not found' });
                    }
                }
            }
        );
    }

    sendMessage = (req: express.Request, res: express.Response) => {
        let threadId = req.body.threadId;
        let text = req.body.text;
        let sender = req.body.sender;
        let date = req.body.date;

        Thread.findOneAndUpdate(
            { 'id': threadId },
            { $set: { 'read': false, 'lastMessageDate': date } },
            { new: true },
            (err, thread) => {
                if (err) console.log(err);
                else {
                    if (thread) {
                        let message = {
                            id: thread.get('messages').length + 1,
                            text: text,
                            sender: sender,
                            date: date,
                            isOffer: false,
                            dateFrom: "-1",
                            dateTo: "-1",
                            offerId: "-1"
                        }
                        Thread.updateOne({ 'id': threadId }, { $push: { 'messages': message } }).then(() => {
                            res.status(200).json({ 'message': 'message sent' });
                        }).catch((err) => {
                            res.status(400).json({ 'message': err });
                        })
                    } else {
                        res.status(400).json({ 'message': 'thread not found' });
                    }
                }
            }
        );
    }

    getThreadById = (req: express.Request, res: express.Response) => {
        let id = req.body.id;

        Thread.findOne(
            { 'id': id },
            (err, thread) => {
                if (err) console.log(err);
                else {
                    res.status(200).json(thread);
                }
            }
        );
    }

    readMessage = (req: express.Request, res: express.Response) => {
        let id = req.body.id;

        Thread.findOneAndUpdate(
            { 'id': id },
            { 'read': true },
            { new: true },
            (err, thread) => {
                if (err) console.log(err);
                else {
                    res.status(200).json({ 'message': 'poruka procitana' });
                }
            }
        );
    }

    toggleArchive = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        let active = req.body.active;

        Thread.findOneAndUpdate(
            { 'id': id },
            { 'active': active },
            (err, thread) => {
                if (err) console.log(err);
                else {
                    res.status(200).json({ 'message': 'thread activity changed' });
                }
            }
        );
    }
}