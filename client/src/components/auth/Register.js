import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import HCaptcha from '@hcaptcha/react-hcaptcha';

const url=process.env.REACT_APP_BACKEND_URL;

const Register = () => {

    const [buttonDisabled,setButtonDisabled]=useState(true);
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
            console.log("Mismatch password")
        else {
            console.log(formData);
            try{
                const res=await axios.post(url+"/api/users",{...formData})
                await console.log(res);
            }
            catch (err){
                console.log(err);
            }
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
                        <input type="email" placeholder="Email Address" name="email" onChange={e=>onChange(e)} />
                            <small className="form-text">This site uses Gravatar so if you want a profile image, use a
                                Gravatar email</small>

                    </div>
                    <div className="form-group">
                        <input
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

export default Register;