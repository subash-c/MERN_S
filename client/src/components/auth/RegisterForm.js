import HCaptcha from "@hcaptcha/react-hcaptcha";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import {connect} from "react-redux";
import {setAlert} from "../../actions/alert";
import {registerMail} from "../../actions/auth";
import PropTypes from "prop-types";


const url=process.env.REACT_APP_BACKEND_URL;

const RegisterForm = (props) => {
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const {name, email, password, confirmPassword} = props.formData;
    const onChange = event => props.setFormData({...props.formData, [event.target.name]: event.target.value});
    const onSubmit = async event => {
        event.preventDefault();
        if (buttonDisabled) {
            props.setAlert("Please verify yoursef!", "danger");
            return;
        }

        if (password !== confirmPassword)
            props.setAlert("Passwords don't match", "danger");
        else {
            await props.registerMail(email);
            props.setFormData({name,email,password});
            props.setOtpForm(true);
        }

    }

    const handleVerificationSuccess = (t, k) => {
        setButtonDisabled(false);
    };
    return <>
        <section className="container">
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={event => onSubmit(event)}>
                {/*action="create-profile.html">*/}
                <div className="form-group">
                    <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)}
                           required/>
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required/>
                    <small className="form-text">This site uses Gravatar so if you want a profile image, use a
                        Gravatar email</small>

                </div>
                <div className="form-group">
                    <input
                        required
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        required
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        minLength="6"
                        onChange={e => onChange(e)}
                    />
                </div>

                <HCaptcha
                    sitekey={process.env.REACT_APP_PUBLIC_HCAPTCHA_SITE_KEY}
                    onVerify={(token, ekey) => handleVerificationSuccess(token, ekey)}
                />

                <input type="submit" className="btn btn-primary" value="Register"/>
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p></section>
    </>
}

RegisterForm.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
}


export default connect(null, {setAlert, registerMail})(RegisterForm);