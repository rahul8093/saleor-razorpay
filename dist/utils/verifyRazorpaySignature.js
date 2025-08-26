"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRazorpaySignature = verifyRazorpaySignature;
const crypto_1 = __importDefault(require("crypto"));
const secret = process.env.RAZORPAY_KEY_SECRET;
function verifyRazorpaySignature(payload, signature) {
  const expected = crypto_1.default
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");
  return expected === signature;
}
