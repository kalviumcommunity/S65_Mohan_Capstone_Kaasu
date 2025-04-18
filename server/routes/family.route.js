const {createFamily,getFamily,addFamilyMember,removeFamilyMember,deleteFamily, joinFamilyMember} = require('../controllers/family.controller')
const router = require('express').Router()

router.post('/create', createFamily)
router.get('/', getFamily)
router.post('/add-member', addFamilyMember)
router.post('/remove-member', removeFamilyMember)
router.post('/join', joinFamilyMember)
router.delete('/:id', deleteFamily)

module.exports  = router