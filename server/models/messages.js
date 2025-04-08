const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: String,
            required: true
        },
        senderName: {
            type: String,
            required: true
        },
        reseverId: {
            type: String,
            required: true,
        },
        message: {
            text: {
                type: String,
                default: ''
            },
            image :{
                type: String,
                defaulf : ''
            },
            video :{
                type: String,
                defaulf : ''
            },
            pdf :{
                pdfName :{
                    type : String,
                    default : ''
                },
                pdfUrl : {
                    type : String,
                    default:''
                }
                
            }
        },
        status : { 
            type : String,
            default : 'unseen',

        }
    }, { timestamps: true }
)

module.exports = mongoose.model('messages', messageSchema)