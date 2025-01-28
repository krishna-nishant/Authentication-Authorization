const adminMiddleware = (req, res, next) => {
    const { role } = req.user
    if (role !== 'admin') {
        return res.status(401).json({
            success: false, message: "Access denied. You are not an admin"
        })
    }
    // return res.status(200).json({
    //     success: true,message: "You are an admin"
    // })
    next()
}
module.exports=adminMiddleware