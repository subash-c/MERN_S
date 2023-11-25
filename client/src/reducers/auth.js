import {REGISTER_SUCCESS,REGISTER_FAILED} from "../actions/types";

const initialState = {
    token:localStorage.getItem("cs-token"),
    user:null,
    loading:true,
    isAuthenticated:false
}

export default function (state=initialState,action)  {
    switch (action.type){
        case REGISTER_SUCCESS:
            localStorage.setItem("cs-token",action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAILED:
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