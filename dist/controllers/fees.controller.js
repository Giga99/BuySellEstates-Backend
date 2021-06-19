"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeesController = void 0;
const fee_1 = __importDefault(require("../models/fee"));
class FeesController {
    constructor() {
        this.getFees = (req, res) => {
            let id = req.body.id;
            fee_1.default.findOne({ 'id': id }, (err, fee) => {
                if (err)
                    console.log(err);
                else
                    res.status(200).json(fee);
            });
        };
        this.updateFees = (req, res) => {
            let id = req.body.id;
            let rentFee = req.body.rentFee;
            let saleFee = req.body.saleFee;
            fee_1.default.findOneAndUpdate({ 'id': id }, { 'rentFee': rentFee, 'saleFee': saleFee }, { new: true }, (err, fee) => {
                if (err)
                    console.log(err);
                else
                    res.status(200).json({ 'message': 'Procenti izmenjeni' });
            });
        };
    }
}
exports.FeesController = FeesController;
//# sourceMappingURL=fees.controller.js.map