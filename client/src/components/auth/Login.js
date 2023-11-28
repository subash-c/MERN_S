import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import {setAlert} from "../../actions/alert";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const Login = ({ login, isAuthenticated,setAlert }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const { email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        if (buttonDisabled) {
            setAlert("Please verify yoursef!", "danger");
            return;
        }
        login(email, password);
    };

    if (isAuthenticated) {
        return <Navigate to="/dashboard" />;
    }
    const handleVerificationSuccess = (t, k) => {
        setButtonDisabled(false);
    };

    return (
        <section className="container">
            <h1 className="large text-primary">Login</h1>
            <p className="lead">
                <i className="fas fa-user" /> Login Into Your Account
            </p>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        minLength="6"
                    />
                </div>
                <HCaptcha
                    sitekey={process.env.REACT_APP_PUBLIC_HCAPTCHA_SITE_KEY}
                    onVerify={(token, ekey) => handleVerificationSuccess(token, ekey)}
                />
                <input type="submit" className="btn btn-primary" value="Login" />

            </form>
            <h4><Link to={"/login/forgotPassword"}><a> Forgot password</a></Link></h4>

            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </section>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login,setAlert })(Login);