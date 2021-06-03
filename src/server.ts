import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import authRouter from './routes/auth.routes';
import estatesRouter from './routes/estates.routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/estatesdb');
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('mongo ok')
});

const router = express.Router();
router.use('/auth', authRouter);
router.use('/estates', estatesRouter);

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));