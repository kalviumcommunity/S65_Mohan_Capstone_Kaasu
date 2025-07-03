const jwt = require('jsonwebtoken')

exports.generateToken = (user, res) => {
    const token = jwt.sign({userId: user._id,familyId: user.familyId, username: user.username}, process.env.JWT_SECRET, {expiresIn:'7d'})
        res.cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly:  process.env.NODE_ENV != "developement",
            sameSite: 'none',
            secure: process.env.NODE_ENV != "developement",
        })
}