import axios from "axios"

import { FRIEND_GET_SUCCESS, MESSAGE_GET_SUCCESS, MESSAGE_SEND_SUCCESS } from '../types/messengerType'


export const getFriend = () => async (dispatch) => {
    try {

        console.log(process.env.REACT_APP_HOST)
        const res = await axios.get(`${process.env.REACT_APP_HOST}/api/messenger/get-friends`, { withCredentials: true })
        console.log(res.data.friends)
        dispatch({
            type: FRIEND_GET_SUCCESS,
            payload: {
                friends: res.data.friends,
            }
        })

    } catch (error) {
        console.error(error)

    }

}
export const messsageSend = (data) => async (dispatch) => {

    try {
        const res = await axios.post(`${process.env.REACT_APP_HOST}/api/messenger/send-message`, data, { withCredentials: true })
        dispatch({
            type: MESSAGE_SEND_SUCCESS,
            payload: {
                message: res.data.message
            }
        })

    } catch (error) {
        console.log(error)

    }

}

export const getMessage = (id) => {

    return async (dispatch) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_HOST}/api/messenger/get-message/${id}`, { withCredentials: true })
            dispatch({
                type: MESSAGE_GET_SUCCESS,
                payload: {
                    message: res.data.message
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

}

export const imageSend = (data) => async (dispatch) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_HOST}/api/messenger/image-send`, data, { withCredentials: true })
        dispatch({
            type: MESSAGE_SEND_SUCCESS,
            payload: {
                message: res.data.message
            }
        })
    } catch (error) {
        console.log(error)

    }
}
export const videoSend = (data) => async (dispatch) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_HOST}/api/messenger/video-send`, data, { withCredentials: true })
        dispatch({
            type: MESSAGE_SEND_SUCCESS,
            payload: {
                message: res.data.message
            }
        })
    } catch (error) {
        console.log(error)

    }
}
export const pdfSend = (data) => async (dispatch) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_HOST}/api/messenger/pdf-send`, data, { withCredentials: true })
        dispatch({
            type: MESSAGE_SEND_SUCCESS,
            payload: {
                message: res.data.message
            }
        })
    } catch (error) {
        console.log(error)

    }
}



export const seenMessage00 = (msg) => async (dispatch) => {

    try {

        const res = await axios.post(`${process.env.REACT_APP_HOST}/api/messenger/seen-message`,msg,{withCredentials:true})

    } catch (error) {

        console.log(error)

    }

}


export const updateMessage00 = (msg) => async (dispatch) => {

    try {

        const res = await axios.post(`${process.env.REACT_APP_HOST}/api/messenger/delivared-message`,msg,{withCredentials:true})

    } catch (error) {

        console.log(error)

    }

}
