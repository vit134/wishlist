import { combineReducers } from 'redux';
import { pageReducer } from './page';
import { userReducer } from './user';
import { overlayReducer } from './overlay';

export const rootReducer = combineReducers({
    page: pageReducer,
    user: userReducer,
    overlay: overlayReducer
});
