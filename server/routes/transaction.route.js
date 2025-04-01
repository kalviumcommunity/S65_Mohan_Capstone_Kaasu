const { createTransaction, getUserTransactions, getFamilyTransactions, editTransaction, deleteTransaction,uploadPDF } = require('../controllers/transaction.controller')
const router = require('express').Router()
const upload = require('../config/multer')


router.post('/create',createTransaction)
router.post('/upload',upload.single('file'),uploadPDF)
router.get('/user', getUserTransactions)
router.get('/family', getFamilyTransactions)
router.put('/edit/:id', editTransaction)
router.delete('/delete/:id', deleteTransaction)

module.exports = router