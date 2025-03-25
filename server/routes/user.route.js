const {login, signup,logout, getProfile, getAllUsers} = require('../controllers/user.controller')
const router = require('express').Router()
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/login', login)
router.get('/logout', logout)
router.post('/signup', signup)
router.post('/profile',authMiddleware, getProfile)
router.get('/all',authMiddleware, getAllUsers)

module.exports = router