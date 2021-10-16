import { combineReducers } from 'redux'
import authReducer from '../modules/auth/redux/reducer';
import signupReducer from '../modules/Home/redux/reducer';
export const rootReducer = combineReducers({
    auth: authReducer,
    signup: signupReducer
});
