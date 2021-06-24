import express from 'express';
import { BlocksController } from '../controllers/blocks.controllers';
const blocksRouter = express.Router();

blocksRouter.route('/blockUnblockUser').post(
    (req, res) => new BlocksController().blockUnblockUser(req, res)
);

blocksRouter.route('/isBlocked').post(
    (req, res) => new BlocksController().isBlocked(req, res)
);

export default blocksRouter;
