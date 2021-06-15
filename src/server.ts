import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import authRouter from './routes/auth.routes';
import estatesRouter from './routes/estates.routes';
import usersRouter from './routes/users.routes';
import offersRouter from './routes/offers.routes';
import messagesRouter from './routes/messages.routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/estatesdb', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('mongo ok')
});

const router = express.Router();
router.use('/auth', authRouter);
router.use('/estates', estatesRouter);
router.use('/users', usersRouter);
router.use('/offers', offersRouter);
router.use('/messages', messagesRouter);

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));