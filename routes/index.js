var express=require('express')
var router=express.Router()
let shop=require('../controllers/shopController')
let navigation=require('../controllers/navgationController')
let location=require('../controllers/locationController')
let helperList=require('../controllers/helperListController')

router.get('/api/getShop',shop.getShop)
router.get('/api/getNavigation',navigation.getNavigation)
router.get('/api/getLocation',location.getLocation)
router.get('/api/getHelperList',helperList.getHelperList)

module.exports=router
