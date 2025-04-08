import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import {authReducer} from './reducers/authReducer';
import { messengerReducer } from './reducers/messengerReducer';

const rootReducer = combineReducers({
    auth : authReducer,
    messenger : messengerReducer
});



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
