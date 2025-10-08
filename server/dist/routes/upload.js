import express from "express";
import multer from "multer";
import { cloudinary } from "../utils/Cloudinary";
const router = express.Router();
// Use memory storage so file is stored in RAM (not on disk)
const storage = multer.memoryStorage();
const upload = multer({ storage });
router.post("/upload", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const fileBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
        const result = await cloudinary.uploader.upload(fileBase64, {
            folder: "practice_uploads",
        });
        res.status(200).json({
            message: "File uploaded successfully",
            url: result.secure_url,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Upload failed", error: error.message });
    }
});
export default router;
//# sourceMappingURL=upload.js.map