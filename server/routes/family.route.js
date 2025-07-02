const {createFamily, joinFamily,createBill, deleteBill} = require('../controllers/family.controller')
const router = require('express').Router()

router.post('/create', createFamily)
router.post('/join', joinFamily)
router.post('/create-bill', createBill)
router.post('/delete-bill', deleteBill)
module.exports = router