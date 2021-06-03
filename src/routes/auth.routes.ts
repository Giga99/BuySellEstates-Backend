import express from 'express';
import { AuthController } from '../controllers/auth.controller';
const authRouter = express.Router();

authRouter.route('/login').post(
    (req, res) => new AuthController().login(req, res)
);

authRouter.route('/register').post(
    (req, res) => new AuthController().register(req, res)
);

authRouter.route('/changePassword').post(
    (req, res) => new AuthController().changePassword(req, res)
);

export default authRouter;
