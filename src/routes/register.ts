// src/routes/register.ts
import { Router } from "express";

const router = Router();

// Saleor calls this endpoint on app installation
router.post("/", async (req, res) => {
  try {
    const { auth_token, saleorApiUrl } = req.body;

    if (!auth_token || !saleorApiUrl) {
      return res.status(400).json({ error: "Missing auth_token or saleorApiUrl" });
    }

    // TODO: Store auth_token securely (DB, secret manager, etc.)
    console.log("App installed with token:", auth_token);
    console.log("Saleor API URL:", saleorApiUrl);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error in /register:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
