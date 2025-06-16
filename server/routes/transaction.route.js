const {uploadPDF, getAllTransactions, getAllInsights} = require('../controllers/transaction.controller')
const router = require('express').Router()
const upload = require('../config/multer')


router.post('/upload',upload.single('file'),uploadPDF)
router.get('/all', getAllTransactions)
router.get('/insights', getAllInsights)

module.exports = router