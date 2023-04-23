"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const razorpay_1 = __importDefault(require("razorpay"));
let instance = new razorpay_1.default({
    key_id: `${process.env.RAZOR_PAY_ID}`,
    key_secret: `${process.env.RAZOR_PAY_SECRET}`,
});
exports.default = instance;
//# sourceMappingURL=index.js.map