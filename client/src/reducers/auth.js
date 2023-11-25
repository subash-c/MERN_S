import {
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAILED
} from "../actions/types";

const initialState = {
    token:localStorage.getItem("cs-token"),
    user:null,
    loading:true,
    isAuthenticated:false
}

export default function (state=initialState,action)  {
    switch (action.type){
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem("cs-token",action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAILED:
        case LOGIN_FAILED:
        case AUTH_ERROR:
            localStorage.removeItem("cs-token");
            return {
                ...state,
                token:null,
                isAuthenticated: false,
                loading: true
            }
        default:
            return state
    }
}