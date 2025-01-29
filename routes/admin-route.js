const express = require('express')
const authMiddleware = require('../middleware/authMiddleware.js')
const adminMiddleware = require('../middleware/adminMiddleware.js')
const router = express.Router()

router.get('/welcome', authMiddleware, adminMiddleware, (req, res) => {
    const { userId, username, role } = req.userInfo
    res.status(200).json({
        success: true,
        message: "Welcome to the admin page",
        data: {
            userId, username, role
        }
    })
})

module.exports = router