var express=require('express')
var router=express.Router()
let shop=require('../controllers/shopController')
let navigation=require('../controllers/navgationController')
let location=require('../controllers/locationController')
let helperList=require('../controllers/helperListController')

router.get('/getShop',shop.getShop)
router.get('/getNavigation',navigation.getNavigation)
router.get('/getLocation',location.getLocation)
router.get('/getHelperList',helperList.getHelperList)

module.exports=router
