import express from "express";
import { verifyToken } from "../utils/JWT";

const router = express.Router();

router.get("/", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ ok: false, message: "No token provided" });

    //   const token = authHeader.split(" ")[1]; //alternative
    const token = authHeader.replace("Bearer ", "")
    try {
        const decoded = verifyToken(token);
        res.json({ ok: true, user: decoded });
    } catch (err) {
        res.status(401).json({ ok: false, message: "Invalid token" });
    }
});

export default router;
