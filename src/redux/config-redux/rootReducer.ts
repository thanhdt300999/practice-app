import { combineReducers } from 'redux'
import signinReducer from '../reducers/signin.reducer';
import signupReducer from '../reducers/signup.reducer';
import homeReducer from '../reducers/home.reducer';
export const rootReducer = combineReducers({
    signin: signinReducer,
    signup: signupReducer,
    home: homeReducer
});
const rootReducer1 = (state, action) => {
    return appReducer(state, action)
  }
export type RootState = ReturnType<typeof rootReducer>