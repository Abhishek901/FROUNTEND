const OTPLibs = {
    sendOTP : async (phoneNumber) => {
        let response:Response;
        let otp:Number;
        try {
            otp = OTPLibs.generateOtp();
            let fetchPointer = await fetch(`https://enterprise.smsgupshup.com/GatewayAPI/rest?method=SendMessage&send_to=${phoneNumber}&msg=Your%20unique%20one-time%20password%20(OTP)%20is%20${otp}.%20Please%20enter%20this&msg_type=TEXT&userid=2000170082&auth_scheme=plain&password=India@123&v=1.1&format=text`);
            response = await fetchPointer;
            response.otp = otp;
        } catch (error) {
            response = error;
        }
        return response;
    },
    generateOtp:()=>{
       return (Math.floor(Math.random()*8)+1)*1000+Math.floor(Math.random()*1000);
    },

    matchOtp:(systemOTP:Number,userInputOTP:Number):Boolean=>{
      return (systemOTP === userInputOTP)?true:false;
    }
}
export default OTPLibs;