import { ERROR_CLEAR, REGISTER_FAIL, REGISTER_SUCCESS, SUCCESS_MESSAGE_CLEAR, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS ,LOGOUT_SUCCESS } from '../types/authType'
import { jwtDecode } from 'jwt-decode'

const authState = {
    loading: true,
    authenticate: false,
    error: '',
    successMessage: '',
    myInfo: ''
}

const tokenDecode = (token) => {
    const tokenDecoded = jwtDecode(token)
    const expTime = new Date(tokenDecoded.exp * 1000);
    if (new Date() > expTime) {
        return null
    }
    else {
        return tokenDecoded;
    }
}
const getToken = localStorage.getItem('access_Token')
if (getToken) {
    const getInfo = tokenDecode(getToken);
    if (getInfo) {
        authState.myInfo = getInfo;
        authState.authenticate = true;
        authState.loading = false;
    }
}
//console.log(`hello ${getToken}`)
export const authReducer = (state = authState, action) => {

    const { payload, type } = action;

    if (type === REGISTER_FAIL || type === USER_LOGIN_FAIL) {
        return {
            ...state,
            error: payload.error,
            authenticate: false,
            myInfo: '',
            loading: true
        }
    }
    if (type === REGISTER_SUCCESS || type === USER_LOGIN_SUCCESS) {
        const myInfo = tokenDecode(payload.accesToken)
        return {
            ...state,
            successMessage: payload.successMessage,
            myInfo: myInfo,
            error: '',
            authenticate: true,
            loading: false
        }
    }
    if (type === SUCCESS_MESSAGE_CLEAR) {
        return {
            ...state,
            successMessage: ''
        }
    }
    if (type === ERROR_CLEAR) {
        return {
            ...state,
            error: ''
        }
    }
    if(type === LOGOUT_SUCCESS){

        return {
            ...state,
            successMessage:payload.message,
            myInfo:'' ,
            error: '',
            authenticate: false,    
            loading: true,


        }

    }
    return state;
}