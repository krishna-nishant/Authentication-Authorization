const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware.js')
const adminMiddleware = require('../middleware/adminMiddleware.js')
const { uploadImage, getImage, deleteImage } = require('../controllers/image-controller.js')
const uploadMiddleware = require('../middleware/uploadMiddleware.js')

router.post('/upload', authMiddleware, adminMiddleware, uploadMiddleware.single('image'), uploadImage)
router.get('/getimage', authMiddleware, getImage)
router.delete('/delete/:id', authMiddleware, adminMiddleware, deleteImage)

module.exports = router