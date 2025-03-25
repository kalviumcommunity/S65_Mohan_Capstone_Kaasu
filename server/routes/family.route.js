const {createFamily,getFamily,addFamilyMember,removeFamilyMember,deleteFamily} = require('../controllers/family.controller')
const router = require('express').Router()

router.post('/create', createFamily)
router.get('/', getFamily)
router.post('/add-member', addFamilyMember)
router.post('/remove-member', removeFamilyMember)
router.delete('/:id', deleteFamily)

module.exports  = router