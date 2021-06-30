"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesController = void 0;
const thread_1 = __importDefault(require("../models/thread"));
class MessagesController {
    constructor() {
        this.getAllThreadsForUser = (req, res) => {
            let username = req.body.username;
            thread_1.default.find({ $or: [{ 'user1': username }, { 'user2': username }] })
                .sort({ lastMessageDate: -1 }).then((estates) => {
                res.status(200).json(estates);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.startThread = (req, res) => {
            let estateId = req.body.estateId;
            let user1 = req.body.user1;
            let user2 = req.body.user2;
            thread_1.default.findOne({ 'estateId': estateId, $or: [{ $and: [{ 'user1': user1 }, { 'user2': user2 }] }, { $and: [{ 'user1': user2 }, { 'user2': user1 }] }] }, (err, thread) => {
                if (err)
                    console.log(err);
                else {
                    if (thread) {
                        res.status(200).json({ 'id': thread.id });
                    }
                    else {
                        thread_1.default.find({}, (err, threads) => {
                            if (err)
                                console.log(err);
                            else {
                                let id = threads.length + 1;
                                let thread = new thread_1.default(req.body);
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
            });
        };
        this.sendMessageOffer = (req, res) => {
            let threadId = req.body.threadId;
            let text = req.body.text;
            let sender = req.body.sender;
            let date = req.body.date;
            let dateFrom = req.body.dateFrom;
            let dateTo = req.body.dateTo;
            let offerId = req.body.offerId;
            thread_1.default.findOneAndUpdate({ 'id': threadId }, { $set: { 'read': false, 'lastMessageDate': date } }, { new: true }, (err, thread) => {
                if (err)
                    console.log(err);
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
                        };
                        thread_1.default.updateOne({ 'id': threadId }, { $push: { 'messages': message } }).then(() => {
                            res.status(200).json({ 'message': 'message offer sent' });
                        }).catch((err) => {
                            res.status(400).json({ 'message': err });
                        });
                    }
                    else {
                        res.status(400).json({ 'message': 'thread not found' });
                    }
                }
            });
        };
        this.sendMessage = (req, res) => {
            let threadId = req.body.threadId;
            let text = req.body.text;
            let sender = req.body.sender;
            let date = req.body.date;
            thread_1.default.findOneAndUpdate({ 'id': threadId }, { $set: { 'read': false, 'lastMessageDate': date } }, { new: true }, (err, thread) => {
                if (err)
                    console.log(err);
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
                        };
                        thread_1.default.updateOne({ 'id': threadId }, { $push: { 'messages': message } }).then(() => {
                            res.status(200).json({ 'message': 'message sent' });
                        }).catch((err) => {
                            res.status(400).json({ 'message': err });
                        });
                    }
                    else {
                        res.status(400).json({ 'message': 'thread not found' });
                    }
                }
            });
        };
        this.getThreadById = (req, res) => {
            let id = req.body.id;
            thread_1.default.findOne({ 'id': id }, (err, thread) => {
                if (err)
                    console.log(err);
                else {
                    res.status(200).json(thread);
                }
            });
        };
        this.readMessage = (req, res) => {
            let id = req.body.id;
            thread_1.default.findOneAndUpdate({ 'id': id }, { 'read': true }, { new: true }, (err, thread) => {
                if (err)
                    console.log(err);
                else {
                    res.status(200).json({ 'message': 'poruka procitana' });
                }
            });
        };
        this.toggleArchive = (req, res) => {
            let id = req.body.id;
            let isUser1 = req.body.isUser1;
            let active = req.body.active;
            if (isUser1) {
                thread_1.default.findOneAndUpdate({ 'id': id }, { 'active1': active }, (err, thread) => {
                    if (err)
                        console.log(err);
                    else {
                        res.status(200).json({ 'message': 'thread activity changed' });
                    }
                });
            }
            else {
                thread_1.default.findOneAndUpdate({ 'id': id }, { 'active2': active }, (err, thread) => {
                    if (err)
                        console.log(err);
                    else {
                        res.status(200).json({ 'message': 'thread activity changed' });
                    }
                });
            }
        };
    }
}
exports.MessagesController = MessagesController;
//# sourceMappingURL=messages.controller.js.map