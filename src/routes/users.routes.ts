import express from 'express';
import { UsersController } from '../controllers/users.controller';
const usersRouter = express.Router();

usersRouter.route('/updateUserInfo').post(
    (req, res) => new UsersController().updateUserInfo(req, res)
);

usersRouter.route('/updateUserUsername').post(
    (req, res) => new UsersController().updateUserUsername(req, res)
);

usersRouter.route('/updateUserEmail').post(
    (req, res) => new UsersController().updateUserEmail(req, res)
);

usersRouter.route('/answerUserRegistration').post(
    (req, res) => new UsersController().answerUserRegistration(req, res)
);

usersRouter.route('/deleteUser').delete(
    (req, res) => new UsersController().deleteUser(req, res)
);

usersRouter.route('/blockUnblockUser').post(
    (req, res) => new UsersController().blockUnblockUser(req, res)
);

export default usersRouter;