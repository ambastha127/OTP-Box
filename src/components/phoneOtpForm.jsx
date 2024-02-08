import React from "react";
import { useState } from "react";
import OtpBox from './OtpBox' 

const phoneOtpForm = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [showOtpInput, setshowOtpInput] = useState(false);

    const handlePhoneNumber = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handlePhoneSubmit = (e) => {
        e.preventDefault();
        // phone validation
        const regex = /[^0-9]/g;
        if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
            alert("Invalid Phone number");
            return;
        }
        setshowOtpInput(true);
    };

    const onOtpSubmit = (otp) => {
        console.log("Login successful",otp);
    };

    return (
        <div>
            {!showOtpInput ? (
                <form onSubmit={handlePhoneSubmit}>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={handlePhoneNumber}
                        placeholder="Enter your phone number"
                    />
                    <button type="submit">Submit</button>
                </form>
            ) : (
                <div>
                    <p>Enter OTP sent to {phoneNumber}</p>
                    <OtpBox length={4} onOtpSubmit={onOtpSubmit} /> 
                </div>
            )}
        </div>
    );
};

export default phoneOtpForm;
