const { createTransaction, getUserTransactions, getFamilyTransactions, editTransaction, deleteTransaction } = require('../controllers/transaction.controller')
const router = require('express').Router()

router.post('/create',createTransaction)
router.get('/user', getUserTransactions)
router.get('/family', getFamilyTransactions)
router.put('/edit/:id', editTransaction)
router.delete('/delete/:id', deleteTransaction)

module.exports = router