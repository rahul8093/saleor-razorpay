import crypto from "crypto";

const secret = process.env.RAZORPAY_KEY_SECRET!;

export function verifyRazorpaySignature(payload: string, signature: string): boolean {
  const expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return expected === signature;
}
