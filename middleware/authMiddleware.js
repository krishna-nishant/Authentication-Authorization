const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    console.log(authHeader);
    // split by space and get 1st element
    const token = authHeader && authHeader.split(" ")[1]
    // console.log(token);
    if (!token) {
        return res.status(401).json({
            success: false, message: "Access denied. No token provided."
        })
    }

    try {
        // token to object
        const decodedToken=jwt.verify(token,process.env.JWT_SECRET_KEY)
        console.log(decodedToken);
        req.user=decodedToken
        next()
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"error"
        })
    }
    next()
}

module.exports = authMiddleware