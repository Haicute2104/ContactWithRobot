const express = require('express');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });


router.post('/', upload.array('image', 3), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'Không có file nào được tải lên.' });
  }

  const imageUrls = req.files.map(file => `http://localhost:3000/uploads/${file.filename}`);

  res.status(200).json({
    message: 'Ảnh đã được tải lên thành công',
    urls: imageUrls, 
  });
});

module.exports = router;