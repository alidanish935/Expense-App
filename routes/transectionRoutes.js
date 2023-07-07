const express = require('express')
const {getAllTransection,addTransection,editTransection,deleteTransection}=require('../controllers/transectionController')

const router = express.Router()

console.log('Transection route ---------')
router.post('/addtransection',addTransection)
router.post('/deleteTransection',deleteTransection)
router.post('/edittransection',editTransection)
router.post('/get-transection',getAllTransection)

module.exports = router
