const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
  "image/gif": "gif",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads");
  },
  filename: (req, file, callback) => {
    const name = `${Date.now()}.${MIME_TYPES[file.mimetype]}`;
    req.body.filename = `/uploads/${name}`;
    callback(null, name);
  },
});

module.exports = multer({ storage: storage }).single("image");
