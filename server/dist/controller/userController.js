import express from "express";
import multer from "multer";
const upload = multer({ dest: 'uploads/' });
const app = express();
app.post('/profile', upload.single('upload_img'), function (req, res, next) {
});
//# sourceMappingURL=userController.js.map