const {createFamily, joinFamily} = require('../controllers/family.controller')
const router = require('express').Router()

router.post('/create', createFamily)
router.post('/join', joinFamily)

module.exports = router