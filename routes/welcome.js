const express = require('express')
const authMiddleware = require('../middleware/authMiddleware.js')
const router = express.Router()

router.get('/welcome', authMiddleware, (req, res) => {
    const { userId, username, role } = req.userInfo
    res.status(200).json({
        success: true,
        message: "Welcome to the homepage",
        data: {
            userId, username, role
        }
    })
})

module.exports = router