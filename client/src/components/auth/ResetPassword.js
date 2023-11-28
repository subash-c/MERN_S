import React from "react";
import {useState} from "react";
import {connect} from "react-redux";
import {resetPassword} from "../../actions/auth";
import {setAlert} from "../../actions/alert";


const ResetPassword =props =>{
    const [buttonDisabled,setButttonDisabled]=useState(true);
    const [formData,setFormData]=useState({
        "password":"",
        "confirmPassword":""
    })

    const {password,confirmPassword}=formData;
    const onSubmit = async event => {
        event.preventDefault();

        if (buttonDisabled) props.setAlert("Enter minimum 6 characters","danger")
        else if (password !== confirmPassword)
            props.setAlert("Passwords don't match", "danger");
        else {
            console.log("PPPPP------")
            await props.resetPassword(props.id,password);

        }

    }

    const onChange =event => {
        setFormData({...formData,[event.target.name]: event.target.value})
        console.log('bsd',buttonDisabled)
        setButttonDisabled(event.target.value.length<6)
    }

    return <>
        <section className="container">

            <p className="lead">
                Enter a new password
            </p>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={onChange}
                        minLength="6"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Reset Password"  />

            </form>



        </section>
    </>
}

const mapStateToProps = state=> ({
    id:state.auth.otp_id
})

export default connect(mapStateToProps,{resetPassword,setAlert})(ResetPassword);