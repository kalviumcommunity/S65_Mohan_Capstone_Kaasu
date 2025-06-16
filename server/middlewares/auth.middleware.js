const jwt = require('jsonwebtoken')

exports.authMiddleware =  (req,res,next) => {
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(404).json({message: "Token not found"})
        }
        const decoded =  jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded){
            return res.status(400).json({message: "Unauthorized Access !!"})
        }
        req.user = decoded
        next()
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error", desc: error.message})
    }
}