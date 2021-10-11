import {combineReducers} from 'redux'
import authReducer from '../modules/auth/redux/reducer';
export const rootReducer = combineReducers(
    { auth: authReducer }
);
