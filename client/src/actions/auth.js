import axios from "axios";
import {REGISTER_SUCCESS, REGISTER_FAILED, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAILED} from "./types";
import {setAlert} from "./alert";
import setAuthToken from "../utils/setAuthToken";

const url=process.env.REACT_APP_BACKEND_URL;


export const loadUser =() => async dispatch =>{
    if (localStorage["cs-token"])
        setAuthToken(localStorage["cs-token"]);

    try{
        const res = await axios.get(url+"/api/auth");
        dispatch(
            {
                type:USER_LOADED,
                payload:res.data

            }
        )
    }
    catch (err){
        dispatch(
            {
                type:AUTH_ERROR
            }
        )
    }
}

export const register = (name,email,password) => async dispatch => {
   try{
       const res=await axios.post(url+"/api/users",{name,email,password})
       dispatch(
           {
               type:REGISTER_SUCCESS,
               payload:res.data
           }
       );
       dispatch(loadUser());
   }
   catch (err){
       const errors=err.response.data.errors;
       if (errors)
           errors.forEach(error => dispatch(setAlert(error.msg,"danger")))
       dispatch(
           {
               type:REGISTER_FAILED
           }
       )
   }
}

export const login = (email,password) => async dispatch => {
    try{
        const res=await axios.post(url+"/api/auth",{email,password})
        dispatch(
            {
                type:LOGIN_SUCCESS,
                payload:res.data
            }
        );
        dispatch(loadUser());
    }
    catch (err){
        const errors=err.response.data.errors;
        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg,"danger")))
        dispatch(
            {
                type:LOGIN_FAILED
            }
        )
    }
}