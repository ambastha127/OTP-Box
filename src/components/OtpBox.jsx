import React from "react";
import { useState , useRef , useEffect} from "react";

const OtpBox = ({ length = 4, onOtpSubmit = () => {} }) => {
    const [otp, setotp] = useState(new Array(length).fill(""));
    const inputrefs = useRef([])

    useEffect(()=>{
        if(inputrefs.current[0]){
            inputrefs.current[0].focus()
        }
    },[])

    console.log(inputrefs);

    const handleChange = (index,e) => {
        const value = e.target.value;
        if(isNaN(value))return;

        //allows one input 
        const newOtp = [...otp];
        newOtp[index]= value.substring(value.length -1)
        setotp(newOtp)

        //submit trigger
        const combineOtp = newOtp.join("")
        if(combineOtp.length===length) 
        onOtpSubmit(combineOtp)

        //move to the next input field
        if(value&&index<length-1 && inputrefs.current[index+1]){
            inputrefs.current[index+1].focus()
        }
    };
    const handleClick = (index) => {
        inputrefs.current[index].setSelectionRange(1,1) 
    };
    const handleKeyDown = (index,e) => {
        if(e.key==="Backspace"&&!otp[index]&& index>0&& inputrefs.current[index-1]){
            inputrefs.current[index-1].focus()
        }
    };
    return (
        <div>
            {otp.map((value, index) => {
                return (
                    <input
                        key={index}
                        type="text"
                        ref={(input)=>{inputrefs.current[index]=input}}
                        value={value} 
                        onChange={(e) => handleChange(index, e)}
                        onClick={()=>{handleClick(index)}}
                        onKeyDown={(e)=>handleKeyDown(index,e)}
                        className="otpinput"
                    />
                );
            })}
        </div>
    );
};

export default OtpBox;
