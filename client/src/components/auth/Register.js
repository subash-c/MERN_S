import { Navigate} from "react-router-dom";
import React, {useState} from "react";
import RegisterForm from "./RegisterForm";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import OTPVerificationForm from "./OTPVerificationForm";



const Register = (props) => {
    const [otpForm,setOtpForm]=useState(false)
    const [formData,setFormData]=useState({})

    if (props.isAuthenticated) {
        return <Navigate to="/dashboard" />;
    }
    console.log("ss",otpForm)

    return (
        <>
            {!otpForm ? (<RegisterForm setOtpForm ={ setOtpForm} setFormData={setFormData} formData={formData}/>) :
                (<OTPVerificationForm setOtpForm ={ setOtpForm} formData={formData}/>)}
        </>
)
}


Register.propTypes = {
    isAuthenticated: PropTypes.bool,
    verified: PropTypes.bool
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    verified:state.auth.verified
});
export default connect(mapStateToProps)(Register);