"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const razorpay_1 = require("./razorpay");
const saleor_1 = require("./saleor");
const verifyRazorpaySignature_1 = require("./utils/verifyRazorpaySignature");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.get("/health", (_, res) => res.send("OK"));
app.post("/saleor/payment/initialize", async (req, res) => {
  const { amount, currency, orderId } = req.body;
  try {
    const razorpayOrder = await (0, razorpay_1.createRazorpayOrder)(
      amount,
      currency,
      orderId,
    );
    res.json({ data: razorpayOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
});
app.post("/razorpay/webhook", async (req, res) => {
  const signature = req.headers["x-razorpay-signature"];
  const payload = JSON.stringify(req.body);
  if (
    !(0, verifyRazorpaySignature_1.verifyRazorpaySignature)(payload, signature)
  ) {
    return res.status(400).send("Invalid signature");
  }
  const event = req.body.event;
  if (event === "payment.captured") {
    await (0, saleor_1.reportTransactionStatus)(
      req.body.payload.payment.entity.order_id,
      "SUCCESS",
    );
  } else if (event === "payment.failed") {
    await (0, saleor_1.reportTransactionStatus)(
      req.body.payload.payment.entity.order_id,
      "FAILED",
    );
  }
  res.json({ received: true });
});
app.listen(3000, () =>
  console.log("Saleor-Razorpay app running on http://localhost:3000"),
);
