import {Link, Navigate} from "react-router-dom";
import React, {useState} from "react";
import {connect} from "react-redux";
import {forgotPassword,resetPassword} from "../../actions/auth";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import {setAlert} from "../../actions/alert";


const ForgotPassword =(props) => {

    const [showOtp,setShowOtp]=useState(false)
    const [formData,setFormData]=useState({
        "email":"",
        "otp":""
    })
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const {email,otp}=formData;
    const onChange = event => setFormData({...formData,[event.target.name]:event.target.value})
    const onSubmit = async event => {
        event.preventDefault();
        console.log(formData,showOtp);
        if (buttonDisabled) {
            props.setAlert("Please verify yoursef!", "danger");
            return;
        }
        if (!showOtp) {
            setShowOtp(true)
            await props.forgotPassword(email);
        }
        else{
            console.log("PPP->",props.otp_id,otp)
            await props.forgotPassword(email,otp,props.otp_id);
        }



    }
    const handleVerificationSuccess = (t, k) => {
        setButtonDisabled(false);
    };
    console.log("passweord rese",props.allowResetPassword)
    if (props.allowResetPassword)
        return <Navigate to={"/login/forgotPassword/resetPassword"}/>


    return <>
        <section className="container">
            <h1 className="large text-primary">Reset Password</h1>

            <form className="form"
                  onSubmit={onSubmit}
            >
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        disabled={showOtp}
                        value={email}
                        onChange={onChange}
                        required
                    />
                </div>
                {
                    showOtp?(<div className="form-group">
                        <div >
                            <label htmlFor="otp">Enter OTP:</label>
                            <input
                                type="text"
                                min="0"  // Set a minimum value to prevent negative numbers
                                max="999999"  // Set a maximum value to prevent more than 6 digits
                                placeholder="OTP"
                                name="otp"
                                id="otp"
                                value={otp}
                                onChange={onChange}
                                pattern="[0-9]*"
                                maxLength="6"
                                autoComplete="off"
                                title="Only numbers allowed"
                                required
                            />
                        </div>
                    </div>):null
                }
                <HCaptcha
                    sitekey={process.env.REACT_APP_PUBLIC_HCAPTCHA_SITE_KEY}
                    onVerify={(token, ekey) => handleVerificationSuccess(token, ekey)}
                />
                <input type="submit" className="btn btn-primary" value="Verify" />

            </form>


            <p className="my-1">
                Back to  <Link to="/login">sign in?</Link>
            </p>
        </section>

    </>
}

const mapStateToProps= state => (
    {

        otp_id:state.auth.otp_id,
        allowResetPassword: state.auth.allowResetPassword
    }
)

export default connect(mapStateToProps,{forgotPassword,resetPassword,setAlert})(ForgotPassword);