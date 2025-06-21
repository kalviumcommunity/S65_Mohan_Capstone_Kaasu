const jwt = require('jsonwebtoken')

exports.generateToken = (user, res) => {
    const token = jwt.sign({userId: user._id, username: user.username}, process.env.JWT_SECRET, {expiresIn:'7d'})
        res.cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly:  true,
            sameSite: 'none',
            secure: true,
        })
}