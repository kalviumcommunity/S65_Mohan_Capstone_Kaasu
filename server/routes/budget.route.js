const { addBudget,getBudget,updateBudget,deleteBudget} = require('../controllers/budget.controller')
const router = require('express').Router()

router.post('/add/:userId', addBudget)
router.get('/:userId', getBudget)
router.put('/edit/:id', updateBudget)
router.delete('/delete/:id', deleteBudget)

module.exports = router