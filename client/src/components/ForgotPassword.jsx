import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = ({ email }) => { // <-- Correctly destructure email
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [step, setStep] = useState(1); // Step 1: Enter email, Step 2: Enter OTP

    const handleSendOTP = async () => {
        try {
            await axios.post("http://localhost:3000/api/auth/forgot-password", { email }); // Now email is a string
            toast.success("OTP sent to your email");
            setStep(2); // Move to next step
        } catch (error) {
            toast.error(error.response?.data?.message || "Error sending OTP");
        }
    };

    const handleVerifyOTP = async () => {
        try {
            await axios.post("http://localhost:3000/api/auth/verify-otp", { email, otp });
            toast.success("OTP verified. Set a new password.");
            setStep(3); // Move to next step
        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid OTP");
        }
    };

    const handleResetPassword = async () => {
        try {
            await axios.post("http://localhost:3000/api/auth/reset-password", { email, newPassword, otp });
            toast.success("Password reset successfully. Please login.");
        } catch (error) {
            toast.error(error.response?.data?.message || "Error resetting password");
        }
    };

    return (
        <div className="container">
            <h2>Forgot Password</h2>
            {step === 1 && (
                <div>
                    <button onClick={handleSendOTP}>Send OTP</button>
                </div>
            )}
            {step === 2 && (
                <div>
                    <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                    <button onClick={handleVerifyOTP}>Verify OTP</button>
                </div>
            )}
            {step === 3 && (
                <div>
                    <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    <button onClick={handleResetPassword}>Reset Password</button>
                </div>
            )}
        </div>
    );
};

export default ForgotPassword;
