// imageUpload.js
import ImageKit from "imagekit";
import multer from "multer";

const imagekit = new ImageKit({
  publicKey: "public_LTo4gUnjDT0CsZ8HAuNMV1i8Fc4=",
  privateKey: "private_v5fAXg/xyHpkO9c2v6Asp8zoypo=",
  urlEndpoint: "https://ik.imagekit.io/pl6m9mvyb",
});

const storage = multer.memoryStorage();

const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];

const fileFilter = (req, file, cb) => {
  if (allowedFormats.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file format"), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter,
});

const fileUpload = async (req, res, next) => {
  try {
    if (!req.file) {
      return next();
    }

    const fileBuffer = req.file.buffer;

    const result = await imagekit.upload({
      file: fileBuffer,
      fileName: `${Date.now()}-${req.file.originalname}`,
      folder: "/",
    });

    req.fileUrl = result.url;
    next();
  } catch (error) {
    console.error("Failed to upload image to ImageKit:", error);
    return res.status(500).send("Failed to upload image");
  }
};

const fileUploads = async (req, res, next) => {
  try {
    const files = req.files || (req.file ? [req.file] : []);

    if (files.length === 0) {
      return next();
    }

    const uploadPromises = files.map((file) =>
      imagekit.upload({
        file: file.buffer,
        fileName: `${Date.now()}-${file.originalname}`,
        folder: "/",
      }),
    );

    const uploadResults = await Promise.all(uploadPromises);
    req.fileUrls = uploadResults.map((result) => result.url);
    next();
  } catch (error) {
    console.error("Failed to upload files to ImageKit:", error);
    return res.status(500).send("Failed to upload files");
  }
};

export { fileUpload, fileUploads };
export default upload;
