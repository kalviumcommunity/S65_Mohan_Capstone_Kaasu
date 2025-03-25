const {login, signup, getProfile, getAllUsers} = require('../controllers/user.controller')
const router = require('express').Router()

router.post('/login', login)
router.post('/signup', signup)
router.post('/profile', getProfile)
router.get('/all', getAllUsers)

module.exports = router