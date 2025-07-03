const {createFamily, joinFamily,createBill, deleteBill, exitFamily} = require('../controllers/family.controller')
const router = require('express').Router()

router.post('/create', createFamily)
router.post('/join', joinFamily)
router.post('/create-bill', createBill)
router.post('/delete-bill', deleteBill)
router.get('/exit', exitFamily)
module.exports = router