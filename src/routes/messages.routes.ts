import express from 'express';
import { MessagesController } from '../controllers/messages.controller';
const messagesRouter = express.Router();

messagesRouter.route('/getAllThreadsForUser').post(
    (req, res) => new MessagesController().getAllThreadsForUser(req, res)
);

messagesRouter.route('/startThread').post(
    (req, res) => new MessagesController().startThread(req, res)
);

messagesRouter.route('/sendMessageOffer').post(
    (req, res) => new MessagesController().sendMessageOffer(req, res)
);

messagesRouter.route('/sendMessage').post(
    (req, res) => new MessagesController().sendMessage(req, res)
);

messagesRouter.route('/getThreadById').post(
    (req, res) => new MessagesController().getThreadById(req, res)
);

messagesRouter.route('/readMessage').post(
    (req, res) => new MessagesController().readMessage(req, res)
);

messagesRouter.route('/toggleArchive').post(
    (req, res) => new MessagesController().toggleArchive(req, res)
);

export default messagesRouter;
