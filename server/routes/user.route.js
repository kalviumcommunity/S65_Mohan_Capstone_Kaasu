const {login, signup,logout, getProfile,checkAuth, getAllUsers} = require('../controllers/user.controller')
const router = require('express').Router()
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/login', login)
router.get('/logout', logout)
router.post('/signup', signup)
router.get('/profile',authMiddleware, getProfile)
router.get('/all',authMiddleware, getAllUsers)
router.get('/check',authMiddleware, checkAuth)

module.exports = router