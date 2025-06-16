const {register, login,logout, getProfile} = require('../controllers/user.controller')
const { authMiddleware } = require('../middlewares/auth.middleware')
const router = require('express').Router()


router.post('/register', register)
router.post('/login', login)
router.get('/profile', authMiddleware, getProfile)
router.get('/logout', logout)

module.exports = router