import express, { Request, Response } from "express";
import multer from "multer";
import { cloudinary } from "../utils/Cloudinary";
import fs from "fs"
import { UploadApiResponse } from "cloudinary";

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads")
  },
  filename: function (req, file, cb) {

    cb(null, file.originalname)
  }
})

// Use memory storage so file is stored in RAM (not on disk)
// const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/register", upload.array("register"), async(req: Request, res: Response) => {
  if (req.files) {
        console.log(req.files); 
        res.send('Multiple images uploaded successfully!');
    } else {
        res.status(400).send('No images uploaded.');
    }
})

router.post("/profile", upload.single("profile"), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path; // path to ./public/uploads/filename
    const fileBase64 = `data:${req.file.mimetype};base64,${fs.readFileSync(filePath).toString("base64")}`;

    const result: UploadApiResponse = await cloudinary.uploader.upload(fileBase64, {
      folder: "practice_uploads",
    });

    res.status(200).json({
      message: "File uploaded successfully",
      url: result.secure_url,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
});

export default router;
