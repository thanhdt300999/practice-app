import { combineReducers } from 'redux'
import signinReducer from '../modules/auth/signin/redux/reducer';
import signupReducer from '../modules/auth/signup/redux/reducer';
import homeReducer from '../modules/Home/redux/reducer';
export const rootReducer = combineReducers({
    signin: signinReducer,
    signup: signupReducer,
    home: homeReducer
});

export type RootState = ReturnType<typeof rootReducer>