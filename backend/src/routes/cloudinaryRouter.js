const express = require('express');
const router = express.Router();
const cloudinaryController = require('../controllers/cloudinaryController');

const multer = require('multer');
const upload = multer();

router.post('/subirFoto', upload.single('foto'), cloudinaryController.upload);

module.exports = router;