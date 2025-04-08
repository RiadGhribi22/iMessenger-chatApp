const express = require('express')
const {signup} = require("../controller/authController")
const {signin} = require("../controller/authController")
const {signout} = require("../controller/authController")
const { authMiddleware } = require('../middleware/authMiddleware');



const router =  express.Router()

router.post('/signup',signup)
router.post('/signin',signin)
router.post('/signout',authMiddleware,signout)

module.exports=router;