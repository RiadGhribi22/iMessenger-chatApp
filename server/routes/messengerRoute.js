const express = require('express')

const {getFriends ,sendMessage,getMessage,imageSend,videoSend,pdfSend,seenMessage01,delivaredMessage01}=require('../controller/messengerAction');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router()


router.get('/get-friends',authMiddleware,getFriends)
router.post('/send-message',authMiddleware,sendMessage)
router.get('/get-message/:id',authMiddleware,getMessage)
router.post('/image-send',authMiddleware,imageSend)
router.post('/video-send',authMiddleware,videoSend)
router.post('/pdf-send',authMiddleware,pdfSend)
router.post('/seen-message',authMiddleware,seenMessage01)
router.post('/delivared-message',authMiddleware,delivaredMessage01)



module.exports=router;