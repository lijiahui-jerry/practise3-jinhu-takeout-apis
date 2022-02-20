var express=require('express')
var router=express.Router()
let User=require('../controllers/userController')

/* GET users listing. */
router.post('/sendCode',User.sendCode)
router.post('/loginWithPhoneAndCode',User.loginWithPhoneAndCode)
router.post('/getUserInfo',User.getUserInfo)

module.exports=router
