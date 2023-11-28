import axios from "axios";
import {
    REGISTER_SUCCESS,
    OTP_ID,
    REGISTER_FAILED,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT,VERIFIED_OTP,
    RESET_PASSWORD_SUCCESS
} from "./types";
import {setAlert} from "./alert";
import setAuthToken from "../utils/setAuthToken";

const url = process.env.REACT_APP_BACKEND_URL;


export const loadUser = () => async dispatch => {
    if (localStorage["cs-token"])
        setAuthToken(localStorage["cs-token"]);

    try {
        const res = await axios.get(url + "/api/auth");
        dispatch(
            {
                type: USER_LOADED,
                payload: res.data

            }
        )
    } catch (err) {
        dispatch(
            {
                type: AUTH_ERROR
            }
        )
    }
}

export const register = (name, email, password) => async dispatch => {
    try {
        const res = await axios.post(url + "/api/users", {name, email, password})
        dispatch(
            {
                type: REGISTER_SUCCESS,
                payload: res.data
            }
        );
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")))
        dispatch(
            {
                type: REGISTER_FAILED
            }
        )
    }
}

export const login = (email, password) => async dispatch => {
    try {
        const res = await axios.post(url + "/api/auth", {email, password})
        dispatch(
            {
                type: LOGIN_SUCCESS,
                payload: res.data
            }
        );
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")))
        dispatch(
            {
                type: LOGIN_FAILED
            }
        )
    }
}


export const logout = () => dispatch => {
    dispatch(
        {
            type: LOGOUT
        }
    )
}

export const userVerified = (otp, {name, email, password},otp_id) => async dispatch => {
    try {
        const bool = await axios.post(url + "/api/auth/email/emailValidation", {otp,id:otp_id})
        if (bool.data) {
            dispatch(register(name, email, password));
        }
        else
        {
            dispatch(setAlert("Wrong OTP", "danger"))
        }
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")))
        dispatch(
            {
                type: REGISTER_FAILED
            }
        )
    }
}


export const registerMail =(email) => async dispatch =>{
    try{
        const res=await axios.post(url+"/api/auth/email/otp",{email})
        dispatch(setAlert("OTP sent", "danger"))
        console.log("res->",res.data);
        dispatch({
            type:OTP_ID,
            payload:res.data
        })

    }
    catch (err){
        console.log("err")
        dispatch(setAlert("Something went wrong", "danger"))
    }
}


export const forgotPassword = (email,enteredOtp=null,otp_id=null) => async dispatch => {
try{
    console.log(enteredOtp)
    if (!enteredOtp){
        dispatch(registerMail(email));
    }
    else{
        const bool=await axios.post(url+"/api/auth/forgotPassword/validOtp",{
            id:otp_id,otp:enteredOtp
        })
        console.log("-->otpee",bool.data)
        if (bool.data.isCorrect){
            dispatch(
                {
                    type:VERIFIED_OTP,
                    payload:bool.data

                }
            )
        }
        else{
            dispatch(setAlert("Wrong OTP", "danger")
            )
        }
    }
}
catch (err){
    dispatch(setAlert("Something went wrong","danger"))
}
}


export const resetPassword = (id,password) => async dispatch =>{
    try{
        console.log("resetPa")
        const res=await axios.post(url+"/api/auth/forgotPassword/resetPassword",{
            id,password
        })
        console.log("resetPa",res.data)
        if (res.data.status){
            dispatch(
                {
                    type:RESET_PASSWORD_SUCCESS
                }
            )
        }
        else
            dispatch(setAlert("Something went wrong","danger"))
    }
    catch (err){
        dispatch(setAlert("Something went wrong","danger"))
    }
}