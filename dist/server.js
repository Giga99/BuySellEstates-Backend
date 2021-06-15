"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const estates_routes_1 = __importDefault(require("./routes/estates.routes"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const offers_routes_1 = __importDefault(require("./routes/offers.routes"));
const messages_routes_1 = __importDefault(require("./routes/messages.routes"));
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/estatesdb', { useNewUrlParser: true });
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('mongo ok');
});
const router = express_1.default.Router();
router.use('/auth', auth_routes_1.default);
router.use('/estates', estates_routes_1.default);
router.use('/users', users_routes_1.default);
router.use('/offers', offers_routes_1.default);
router.use('/messages', messages_routes_1.default);
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map