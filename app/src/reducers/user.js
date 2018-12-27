import {
    IS_LOGIN_REQUEST,
    IS_LOGIN_SUCCESS,
    IS_LOGIN_FAIL,
    REG_REQUEST,
    REG_SUCCESS,
    REG_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    GET_USER_INFO_REQUEST,
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_FAIL
} from '../actions/UserActions';

const initialState = {
    isLogin: false,
    user_info: {},
    error: '',
    isFetching: false,
    some_user: {
        isFetching: false,
        data: null
    }
};

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case IS_LOGIN_REQUEST:
            return { ...state, isFetching: true, error: '' };
        case IS_LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isLogin: action.payload.user ? true : false,
                user_info: action.payload.user ? action.payload.user : state.user_info };
        case IS_LOGIN_FAIL:
            return {
                ...state,
                isFetching: false,
                error: action.payload.message
            };
        case REG_REQUEST:
            return { ...state, isFetching: true, error: '' };
        case REG_SUCCESS:
            return { ...state, isFetching: false, isLogin: true, user_info: action.payload.user };
        case REG_FAIL:
            return {
                ...state,
                isFetching: false,
                error: action.payload.message
            };
        case LOGIN_REQUEST:
            return { ...state, isFetching: true, error: '' };
        case LOGIN_SUCCESS:
            return { ...state, isFetching: false, isLogin: true, user_info: action.payload.user };
        case LOGIN_FAIL:
            return {
                ...state,
                isFetching: false,
                error: action.payload.message
            };
        case LOGOUT_REQUEST:
            return { ...state, isFetching: true, error: '' };
        case LOGOUT_SUCCESS:
            return { ...state, isFetching: false, isLogin: false, user_info: {} };
        case LOGOUT_FAIL:
            return {
                ...state,
                isFetching: false,
                error: action.payload.message
            };
        case GET_USER_INFO_REQUEST:
            return { ...state, some_user: Object.assign(state.some_user, {isFetching: true}) };
        case GET_USER_INFO_SUCCESS:
            return {
                ...state,
                some_user: Object.assign(state.some_user, {
                    isFetching: false,
                    data: action.payload
                }) 
            };
        case GET_USER_INFO_FAIL:
            return {
                ...state,
                some_user: Object.assign(state.some_user, {
                    isFetching: false,
                    error: action.payload
                }) 
            };
        default:
            return state;
    }
}
