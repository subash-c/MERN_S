import React, {useRef, useEffect, useState} from 'react';
import "./OTPVerification.css"
import {connect} from "react-redux";
import {userVerified, register} from "../../actions/auth";
import {Link} from "react-router-dom";
import auth from "../../reducers/auth";


const OTPVerificationForm = (props) => {
    const inputRefs = useRef([]);
    const [enteredOTP, setEnteredOTP] = useState('');

    useEffect(() => {
        const inputs = inputRefs.current;
        const button = document.querySelector("button");

        const handleKeyUp = (index) => (e) => {
            const currentInput = inputs[index];
            // console.log(currentInput)
            const nextInput = currentInput.nextElementSibling;
            const prevInput = currentInput.previousElementSibling;

            if (currentInput.value.length > 1) {
                currentInput.value = "";
                return;
            }

            if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
                nextInput.removeAttribute("disabled");
                nextInput.focus();
            }


            if (e.key === "Backspace") {

                inputs.forEach((input, index2) => {
                    if (index <= index2 && prevInput) {
                        input.setAttribute("disabled", true);
                        input.value = "";
                        prevInput.focus();
                    }
                });
            }

            if (!inputs[5].disabled && inputs[5].value !== "") {
                const otpArray = inputs.map((input) => input.value);
                setEnteredOTP(otpArray.join(''));
                button.classList.add("active");
                return;
            }
            button.classList.remove("active");
            const otpArray = inputs.map((input) => input.value);
            setEnteredOTP(otpArray.join(''));
        };

        inputs.forEach((input, index) => {
            input.addEventListener("keyup", handleKeyUp(index));
        });

        window.addEventListener("load", () => inputs[0].focus());

        return () => {
            inputs.forEach((input, index) => {
                input && input.removeEventListener("keyup", handleKeyUp(index));
            });
        };
    }, []);

    const handel = async (e) => {
        e.preventDefault();
        console.log('Entered OTP:', enteredOTP,props.otp_id, props.userVerified);

        await props.userVerified(enteredOTP, props.formData,props.otp_id)

    }


    return (
        <div className="container">
            <header>
                {/*<i className="bx bxs-check-shield"></i>*/}
            </header>
            <h4>Enter OTP Code that is sent to {props.formData.email}</h4>
            <form action="#" onSubmit={e => handel(e)}>
                <div className="input-field">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                        <input
                            key={index}
                            type="number"
                            ref={(el) => (inputRefs.current[index] = el)}
                            maxLength="1"
                            // value=""
                            disabled={index !== 0}
                        />
                    ))}
                </div>
                <button>Verify OTP</button>


            </form>
            <h4>Wrong mail? <a style={{
                cursor: 'pointer',
                transition: 'color 0.3s ease-in-out',
            }}
             onClick={e => props.setOtpForm(false)}>Change here</a></h4>
        </div>
    );
};

const mapStateToProps = state => (
    {
        otp_id:state.auth.otp_id
    }
)

export default connect(mapStateToProps, {userVerified, register})(OTPVerificationForm);
