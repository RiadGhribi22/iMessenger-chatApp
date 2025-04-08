const Users = require('../models/users')
const Messages = require('../models/messages')
const formidable = require('formidable')
const fs = require('fs');
const path = require('path')

const getLastMessage = async (myId, fdId) => {

    const msg = await Messages.findOne({
        $or: [{
            $and: [{
                senderId: {
                    $eq: myId
                }
            }, {
                reseverId: {
                    $eq: fdId
                }
            }]
        }, {
            $and: [{
                senderId: {
                    $eq: fdId
                }

            }, {

                reseverId: {
                    $eq: myId
                }
            }]
        }]

    }).sort({
        updatedAt: -1
    })

    return msg;
}
const getFriends = async (req, res) => {

    const myId = req.myId;

    let fd_msg = []

    console.log(myId)
    try {

        const friendGets = await Users.find({
            _id: {
                $ne: myId
            }
        });
        for (let i = 0; i < friendGets.length; i++) {
            let lmsg = await getLastMessage(myId, friendGets[i].id);
            fd_msg = [...fd_msg, {
                fdInfo: friendGets[i],
                msgInfo: lmsg
            }]
        }

        return res.status(200).json({ success: true, friends: fd_msg });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: {
                errMessage: 'Internal Server Error',
            }
        })
    }
}
const sendMessage = async (req, res) => {
    const senderId = req.myId;

    const { senderName, reseverId, message } = req.body;

    try {

        const insertMessage = await Messages.create({
            senderId: senderId,
            senderName: senderName,
            reseverId: reseverId,
            message: {
                text: message,
                images: ''
            },

        })
        res.status(201).json({
            success: true,
            message: insertMessage
        })
    } catch (error) {

        res.status(500).json({
            error: {
                errMessage: 'Internal Server Error'
            }
        })
    }

}


const getMessage = async (req, res) => {
    const myId = req.myId;
    const fdId = req.params.id;
    try {
        let getAllMessage = await Messages.find({

            $or: [{
                $and: [{
                    senderId: {
                        $eq: myId
                    }
                }, {
                    reseverId: {
                        $eq: fdId
                    }
                }]
            }, {
                $and: [{
                    senderId: {
                        $eq: fdId
                    }

                }, {

                    reseverId: {
                        $eq: myId
                    }
                }]
            }]

        });



        res.status(200).json({
            success: true,
            message: getAllMessage
        })


    } catch (error) {

        res.status(500).json({
            error: {
                errMessage: 'Internal Server Error'
            }
        })

    }
}

const imageSend = async (req, res) => {
    const senderId = req.myId;


    const form = formidable()
    form.parse(req, async (err, fields, files) => {

        const { senderName, newImageName, reseverId } = fields;
        const { image } = files;




        const newPath = path.join(__dirname, `../store/userImages`, newImageName);

        files.image.originalFilename = newImageName;

        try {


            fs.copyFile(files.image.filepath, newPath, async (err) => {
                if (!err) {
                    const insertMessage = await Messages.create({
                        senderId: senderId,
                        senderName: senderName,
                        reseverId: reseverId,
                        message: {
                            text: '',
                            image: files.image.originalFilename
                        },

                    })


                    res.status(201).json({
                        success: true,
                        message: insertMessage
                    })
                }
                else {

                    res.status(500).json({
                        error: {
                            errMessage: ['Image Upload Field!!!']
                        }
                    })
                }




            })



        }

        catch (error) {
            res.status(500).json({
                error: {
                    errMessage: ['Internal Server Error ']
                }
            })
        }




    })
}
const videoSend = async (req, res) => {


    console.log('hello')
    const senderId = req.myId;
   

    const form = formidable()
    form.parse(req, async (err, fields, files) => {

        const { senderName, newVideoName, reseverId } = fields;
        const { video } = files;

        console.log(req)




        const newPath = path.join(__dirname, `../store/msgVideos`, newVideoName);

        files.video.originalFilename = newVideoName;

        try {


            fs.copyFile(files.video.filepath, newPath, async (err) => {
                if (!err) {
                    const insertMessage = await Messages.create({
                        senderId: senderId,
                        senderName: senderName,
                        reseverId: reseverId,
                        message: {
                            text: '',
                            video : files.video.originalFilename
                        },

                    })


                    res.status(201).json({
                        success: true,
                        message: insertMessage
                    })
                }
                else {

                    res.status(500).json({
                        error: {
                            errMessage: ['Video Upload Field!!!']
                        }
                    })
                }




            })



        }

        catch (error) {
            console.log(error)
            res.status(500).json({
                error: {
                    errMessage: ['Internal Server Error ']
                }
            })
        }




    })
}
const pdfSend = async (req, res) => {


    const senderId = req.myId;
   

    const form = formidable()
    form.parse(req, async (err, fields, files) => {

        const { senderName, newPdfName, reseverId } = fields;
        const { pdf } = files;





        const newPath = path.join(__dirname, `../store/msgPDFs`, newPdfName);

        const orignalName00 = files.pdf.originalFilename;
        files.pdf.originalFilename = newPdfName;

        try {


            fs.copyFile(files.pdf.filepath, newPath, async (err) => {
                if (!err) {
                    const insertMessage = await Messages.create({
                        senderId: senderId,
                        senderName: senderName,
                        reseverId: reseverId,
                        message: {
                            text: '',
                            pdf:{
                                pdfName : orignalName00,
                                pdfUrl : files.pdf.originalFilename}
                        },

                    })


                    res.status(201).json({
                        success: true,
                        message: insertMessage
                    })
                }
                else {

                    res.status(500).json({
                        error: {
                            errMessage: ['PDF Upload Field!!!']
                        }
                    })
                }




            })



        }

        catch (error) {
            console.log(error)
            res.status(500).json({
                error: {
                    errMessage: ['Internal Server Error ']
                }
            })
        }




    })
}

const seenMessage01 = async (req, res) => {
    const msgId = req.body._id;
    
    await Messages.findByIdAndUpdate(msgId,{
        status:'seen'
    }).then(()=>{
        res.status(200).json({
            success : true
        })
    }).catch(()=>{
        res.status(500).json({
            error :{
                errMessage : 'Internal Server Error'
            }
        })
    })

}
const delivaredMessage01 = async(req,res)=>{
    const msgId = req.body._id;
    
    await Messages.findByIdAndUpdate(msgId,{
        status:'unseen'
    }).then(()=>{
        res.status(200).json({
            success : true
        })
    }).catch(()=>{
        res.status(500).json({
            error :{
                errMessage : 'Internal Server Error'
            }
        })
    })



}
module.exports = {
    getFriends,
    sendMessage,
    getMessage,
    imageSend,
    seenMessage01,
    delivaredMessage01,
    videoSend,
    pdfSend
}