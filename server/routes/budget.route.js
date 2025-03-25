const { addBudget,getBudget,updateBudget,deleteBudget} = require('../controllers/budget.controller')
const router = require('express').Router()

router.post('/add', addBudget)
router.get('/', getBudget)
router.put('/edit/:id', updateBudget)
router.delete('/delete/:id', deleteBudget)

module.exports = router