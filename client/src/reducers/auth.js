import {
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAILED, LOGOUT,
    OTP_ID, VERIFIED_OTP, RESET_PASSWORD_SUCCESS
} from "../actions/types";

const initialState = {
    token:localStorage.getItem("cs-token"),
    user:null,
    loading:true,
    isAuthenticated:false,
    otp_id:null,
    allowResetPassword:false
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
        case LOGOUT:
            localStorage.removeItem("cs-token");
            return {
                ...state,
                token:null,
                isAuthenticated: false,
                loading: false,
                user:null
            }
        case OTP_ID:
            return {
                ...state,
                otp_id: action.payload.id
            }
        case VERIFIED_OTP:
            return {
                ...state,
                allowResetPassword:true,
                otp_id: action.payload.id
            }
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                allowResetPassword: false
            }
        default:
            return state
    }
}