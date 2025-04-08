
import { FRIEND_GET_SUCCESS, MESSAGE_GET_SUCCESS, MESSAGE_SEND_SUCCESS, UPDATE_FRIEND_MESSAGE, SOCKET_MESSAGE, MESSAGE_SEND_SUCCESS_CLEAR, SEEN_MESSAGE, UNSEEN_MESSAGE, UPDATE, MESSAGE_GET_SUCCESS_CLEAR, SEEN_SUCCESS_01 } from '../types/messengerType'


const messengerState = {

    friends: [],
    message: [],
    mesageSendSuccess: false,
    message_get_success: false

}

export const messengerReducer = (state = messengerState, action) => {

    const { type, payload } = action;

    if (type === FRIEND_GET_SUCCESS) {
        return {
            ...state,
            friends: payload.friends,
        }
    }
    if (type === MESSAGE_GET_SUCCESS) {
        return {
            ...state,
            message_get_success: true,

            message: payload.message,
        }
    }

    if (type === MESSAGE_SEND_SUCCESS) {
        return {
            ...state,
            mesageSendSuccess: true,

            message: [...state.message, payload.message]
        }
    }
    if (type === SOCKET_MESSAGE) {
        return {
            ...state,
            message: [...state.message, payload.message]
        }
    }
    if (type === UPDATE_FRIEND_MESSAGE) {
        const index = state.friends.findIndex(f => f.fdInfo._id === payload.msgInfo.reseverId
            || f.fdInfo._id === payload.msgInfo.senderId
        )
        if (index !== -1 && state.friends[index].msgInfo) {
            state.friends[index].msgInfo = payload.msgInfo;
            state.friends[index].msgInfo.status = payload.status;
            state.friends[index].msgInfo.updatedAt = payload.updatedAt;

        }


        return state;
    }

    if (type === MESSAGE_SEND_SUCCESS_CLEAR) {
        return {
            ...state,
            mesageSendSuccess: false,

        }
    }
    if (type === SEEN_MESSAGE) {
        const index = state.friends.findIndex(f => f.fdInfo._id === payload.msgInfo.reseverId
            || f.fdInfo._id === payload.msgInfo.senderId
        )
        if (index !== -1 && state.friends[index].msgInfo) {
            state.friends[index].msgInfo.status = 'seen'
            state.friends[index].msgInfo.updatedAt = new Date().toISOString();
        }
        return {
            ...state

        };
    }
    if (type === UNSEEN_MESSAGE) {
        const index = state.friends.findIndex(f => f.fdInfo._id === payload.msgInfo.reseverId
            || f.fdInfo._id === payload.msgInfo.senderId
        )
        if (index !== -1 && state.friends[index].msgInfo) {
            state.friends[index].msgInfo.status = 'unseen'
        }
        return {
            ...state

        };


    }

    if (type === UPDATE) {
        const index = state.friends.findIndex(f => f.fdInfo._id === payload.id)


        if (index !== -1 && state.friends[index].msgInfo === null) {

            return state;

        }

        else {
            state.friends[index].msgInfo.status = 'seen';
            state.friends[index].msgInfo.updatedAt = new Date().toISOString();
        }

        return {

            ...state
        }


    }
    if (type === MESSAGE_GET_SUCCESS_CLEAR) {
        return {
            ...state,
            message_get_success: false
        }
    }
    if (type === SEEN_SUCCESS_01) {
        const index = state.friends.findIndex(f => f.fdInfo._id === payload.reseverId)
        if(index !== -1 && state.friends[index].msgInfo){
            state.friends[index].msgInfo.status = 'seen'
            state.friends[index].msgInfo.updatedAt = new Date().toISOString();
    

        }


        return {
            ...state

        };
    }


    return state
}