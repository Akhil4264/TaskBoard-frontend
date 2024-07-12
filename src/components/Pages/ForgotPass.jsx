import React, { useState } from 'react';
import request from '../request'
import { useNavigate } from 'react-router';

function ForgotPassword() {
    const navigate = useNavigate()
    const [otpSectionActive, setOtpSectionActive] = useState(false);
    const [email,setEmail] = useState("")
    const handleSendOtp = () => {
        // setOtpSectionActive(true);
        request.post('/forgot-password',{email})
        .then((res) => {
            if(res.data.error){
                alert(res.data.error)
            }
            if(res.data.message){
                alert(res.data.message)
                setEmail("")
            }
        })
        .catch((e) => {
            console.log(e)
            alert("error in reaching the server")
        })
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 text-white" style={{ backgroundImage: "url('/bg/image1.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="p-5 shadow rounded" style={{ maxWidth: '500px', position: 'absolute', top: '300px', left: '300px' }}>
                <h1 className="fs-3 fw-bold text-center mb-3">Forgot Password</h1>
                <form action="/send-otp" method="post">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-bold">Enter your Email:</label>
                        <input type="email" className="form-control" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}required />
                    </div>
                    <button type="button" onClick={handleSendOtp} className="btn btn-primary w-100">submit</button>
                </form>

                <a href="/" className="d-block text-center mt-3 fw-bold text-white text-decoration-none">Back to Login</a>
            </div>
        </div>
    );
}

export default ForgotPassword;
