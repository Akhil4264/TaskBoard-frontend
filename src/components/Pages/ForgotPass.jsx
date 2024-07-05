import React, { useState } from 'react';

function ForgotPassword() {
    const [otpSectionActive, setOtpSectionActive] = useState(false);
    const handleSendOtp = () => {
        setOtpSectionActive(true);
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 text-white" style={{ backgroundImage: "url('/bg/image1.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {/* Increase the maxWidth and adjust padding if needed */}
            <div className="p-5 shadow rounded" style={{ maxWidth: '500px', position: 'absolute', top: '300px', left: '300px' }}>
                <h1 className="fs-3 fw-bold text-center mb-3">Forgot Password</h1>
                <form action="/send-otp" method="post">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-bold">Enter your Email:</label>
                        <input type="email" className="form-control" id="email" name="email" required />
                    </div>
                    <button type="button" onClick={handleSendOtp} className="btn btn-primary w-100">{otpSectionActive ? "Resend OTP" : "Send OTP"}</button>
                    {otpSectionActive && (
                        <>
                            <div className="mt-3">
                                <div className="mb-3">
                                    <label htmlFor="otp" className="form-label">Enter OTP:</label>
                                    <input type="text" className="form-control" id="otp" name="otp" required />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-success w-100">Verify OTP</button>
                        </>
                    )}
                </form>

                <a href="/" className="d-block text-center mt-3 fw-bold text-white text-decoration-none">Back to Login</a>
            </div>
        </div>
    );
}

export default ForgotPassword;
