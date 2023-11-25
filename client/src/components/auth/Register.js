import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {connect} from "react-redux";
import HCaptcha from '@hcaptcha/react-hcaptcha';
import {setAlert} from "../../actions/alert";
import PropTypes from "prop-types";
import auth from "../../reducers/auth";
import {register} from "../../actions/auth";

const url=process.env.REACT_APP_BACKEND_URL;

const Register = (props) => {

    const [buttonDisabled,setButtonDisabled]=useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const {name, email, password, confirmPassword} = formData;
    const onChange = event => setFormData( {...formData,[event.target.name]:event.target.value});
    const onSubmit = async event => {
        event.preventDefault();
        if (buttonDisabled) {
            alert("Please verify yoursef");
            return ;
        }

        if (password!==confirmPassword)
            props.setAlert("Passwords don't match","danger");
        else {
           await props.register(name,email,password);
        }

    }

    const handleVerificationSuccess = (t,k) => {
        setButtonDisabled(false);
    } ;



    return (
        <>
            <section className="container">
                <h1 className="large text-primary">Sign Up</h1>
                <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
                <form className="form" onSubmit={event => onSubmit(event)} >
                    {/*action="create-profile.html">*/}
                    <div className="form-group">
                        <input type="text" placeholder="Name" name="name" value={name}  onChange={e=>onChange(e)} required/>
                    </div>
                    <div className="form-group">
                        <input type="email" placeholder="Email Address" name="email" onChange={e=>onChange(e)} required/>
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
                            onChange={e=>onChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            required
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            minLength="6"
                            onChange={e=>onChange(e)}
                        />
                    </div>

                        <HCaptcha
                            sitekey={process.env.REACT_APP_PUBLIC_HCAPTCHA_SITE_KEY}
                            onVerify={(token,ekey) => handleVerificationSuccess(token, ekey)}
                        />

                    <input type="submit" className="btn btn-primary" value="Register"    />
                </form>
                <p className="my-1">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p></section>
        </>
)
}

Register.propTypes ={
    setAlert:PropTypes.func.isRequired,
    register:PropTypes.func.isRequired
}

export default connect(null,{setAlert,register})(Register);