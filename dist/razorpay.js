"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRazorpayOrder = createRazorpayOrder;
const axios_1 = __importDefault(require("axios"));
const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;
async function createRazorpayOrder(amount, currency, receipt) {
    const auth = { username: keyId, password: keySecret };
    const res = await axios_1.default.post("https://api.razorpay.com/v1/orders", {
        amount: amount * 100,
        currency,
        receipt
    }, { auth });
    return res.data;
}
