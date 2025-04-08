import axios from 'axios'
import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS } from '../types/authType'

export const userRegister = (data) => {

    return async (dispatch) => {

        try {
            const res = await axios.post(`${process.env.REACT_APP_HOST}/api/messenger/signup`, data, { withCredentials: true })

            localStorage.setItem('access_Token', res.data.access_Token)
            dispatch({
                type: REGISTER_SUCCESS,
                payload: {
                    successMessage: res.data.successMessage,
                    accesToken: res.data.access_Token
                }
            })

        } catch (error) {
            console.log(error)
            dispatch({

                type: REGISTER_FAIL,
                payload: {
                    error: error.response.data.error.errMessage
                }
            })
        }

    }
}
export const userLogin = (data) => {

    return async (dispatch) => {

        try {
            console.log(data)
            const res = await axios.post(`${process.env.REACT_APP_HOST}/api/messenger/signin`, data, { withCredentials: true })

            localStorage.setItem('access_Token', res.data.access_Token)
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: {
                    successMessage: res.data.successMessage,
                    accesToken: res.data.access_Token
                }
            })

        } catch (error) {
            console.log(error)
            dispatch({

                type: USER_LOGIN_FAIL,
                payload: {
                    error: error.response.data.error.errMessage
                }
            })
        }

    }
}


export const userLogout = () => async (dispatch) => {

    try {
        const res = await axios.post(`${process.env.REACT_APP_HOST}/api/messenger/signout`,{},{withCredentials : true})
        console.log(res)
        if(res.data.success){
            localStorage.removeItem('access_Token');
            dispatch({
                type : 'LOGOUT_SUCCESS',
                payload : {
                    message : res.data.successMessage
                }
            
            })



        }
    } catch (error) {

        console.log(error)

    }

}