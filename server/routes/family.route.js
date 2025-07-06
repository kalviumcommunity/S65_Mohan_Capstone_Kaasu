const {createFamily, joinFamily,createBill, deleteBill, exitFamily, addMessage, getMessages} = require('../controllers/family.controller')
const router = require('express').Router()

router.post('/create', createFamily)
router.post('/join', joinFamily)
router.post('/create-bill', createBill)
router.post('/delete-bill', deleteBill)
router.get('/exit', exitFamily)
router.post('/send-message', addMessage)
router.get('/messages', getMessages)
module.exports = router