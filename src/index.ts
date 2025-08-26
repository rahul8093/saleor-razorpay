import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import Razorpay from "razorpay";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Config
const PORT = process.env.PORT || 3000;
const razorpayKeyId = process.env.RAZORPAY_KEY_ID || "";
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || "";

// Razorpay Instance
const razorpay = new Razorpay({
  key_id: razorpayKeyId,
  key_secret: razorpayKeySecret,
});

// ✅ Health check
app.get("/health", (_, res) => {
  res.json({ status: "ok", message: "Saleor ↔ Razorpay app running" });
});

// ✅ Create Razorpay order
app.post("/payment", async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const options = {
      amount: amount * 100, // amount in paise
      currency: currency || "INR",
      receipt: "receipt_order_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Error creating Razorpay order:", err);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
});

// ✅ Razorpay webhook (Saleor will listen to status updates)
app.post("/webhook", (req, res) => {
  console.log("Webhook received:", req.body);
  // Here you would update Saleor Transaction API
  res.json({ status: "ok" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
