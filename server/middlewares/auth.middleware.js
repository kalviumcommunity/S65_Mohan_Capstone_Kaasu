const jwt = require('jsonwebtoken')

const authMiddleware =  (req,res, next) => {
    try {
        const token = req.cookies?.token
        if(!token){
            return res.status(404).json({msg: "Token Not Found"})
        }
        const decoded =  jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(500).json({msg: "Internal Server Error", desc:error.message})
    }
}

module.exports = authMiddleware