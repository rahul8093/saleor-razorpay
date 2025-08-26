import axios from "axios";

const keyId = process.env.RAZORPAY_KEY_ID!;
const keySecret = process.env.RAZORPAY_KEY_SECRET!;

export async function createRazorpayOrder(amount: number, currency: string, receipt: string) {
  const auth = { username: keyId, password: keySecret };
  const res = await axios.post("https://api.razorpay.com/v1/orders", {
    amount: amount * 100,
    currency,
    receipt
  }, { auth });
  return res.data;
}
