const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware.js')
const adminMiddleware = require('../middleware/adminMiddleware.js')
const { uploadImage } = require('../controllers/image-controller.js')
const uploadMiddleware = require('../middleware/uploadMiddleware.js')

router.post('/upload', authMiddleware, adminMiddleware,uploadMiddleware.single('image'), uploadImage)

module.exports = router