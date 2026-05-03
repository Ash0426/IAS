import React, { useState } from 'react';
import { supabase } from '../../backend/config/supabaseClient';
import { UserPlus, Lock, Mail, AlertCircle, CheckCircle2, Eye, EyeOff, KeyRound } from 'lucide-react';

const Register = ({ onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState(''); // Initialized to "" to prevent Controlled Input error
  const [step, setStep] = useState(1); 
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const validatePassword = (pass) => {
    return /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(pass);
  };

  // Phase 1: Use signUp to trigger the "Confirm Signup" Template
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    if (password !== confirmPassword) {
      setIsError(true);
      setMessage("Validation Error: Passwords do not match.");
      return;
    }

    if (!validatePassword(password)) {
      setIsError(true);
      setMessage("Security Policy: Password must be 8+ characters with one special character.");
      return;
    }

    setLoading(true);
    
    // CHANGED: Use signUp instead of signInWithOtp to avoid Magic Links
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);
    if (error) {
      setIsError(true);
      setMessage(error.message);
    } else {
      setStep(2);
      setMessage("Verification code sent to your Gmail.");
    }
  };

  // Phase 2: Verify OTP using type: 'signup'
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'signup' // CHANGED: Must be 'signup' to match the signUp method
    });

    if (error) {
      setIsError(true);
      setMessage("Invalid Code: " + error.message);
      setLoading(false);
    } else {
      setIsError(false);
      setMessage("Identity Verified. Registration Complete!");
      setLoading(false);
      // Logic for redirect or auto-login
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '60px auto', padding: '0 20px', textAlign: 'left', color: '#000' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
        <UserPlus size={28} strokeWidth={2.5} />
        <h2 style={{ fontSize: '26px', fontWeight: '900', margin: 0, textTransform: 'uppercase' }}>
          {step === 1 ? "Register" : "Verify Gmail"}
        </h2>
      </div>
      <div style={{ width: '100%', height: '2px', background: '#000', marginBottom: '30px' }} />

      {step === 1 ? (
        <form onSubmit={handleRequestOtp} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={14} /> Email
            </label>
            <input 
              type="email" 
              placeholder="user@gmail.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required 
              style={{ width: '100%', padding: '12px 0', border: 'none', borderBottom: '2px solid #000', fontSize: '16px', outline: 'none', background: 'transparent' }}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <label style={{ fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Lock size={14} /> Password
            </label>
            <input 
              type={showPass ? "text" : "password"} 
              placeholder="8+ characters + Symbol" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={{ width: '100%', padding: '12px 0', border: 'none', borderBottom: '2px solid #000', fontSize: '16px', outline: 'none', background: 'transparent' }}
            />
            <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 0, bottom: '12px', background: 'none', border: 'none', cursor: 'pointer' }}>
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div style={{ position: 'relative' }}>
            <label style={{ fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Lock size={14} /> Confirm Password
            </label>
            <input 
              type={showConfirm ? "text" : "password"} 
              placeholder="Repeat access key" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
              style={{ width: '100%', padding: '12px 0', border: 'none', borderBottom: '2px solid #000', fontSize: '16px', outline: 'none', background: 'transparent' }}
            />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={{ position: 'absolute', right: 0, bottom: '12px', background: 'none', border: 'none', cursor: 'pointer' }}>
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button type="submit" disabled={loading} style={{ padding: '14px', background: '#000', color: '#fff', border: 'none', fontWeight: '900', textTransform: 'uppercase', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? "Sending OTP..." : "Get Verification Code"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <KeyRound size={14} /> 6-Digit OTP
            </label>
            <input 
              type="text" 
              placeholder="000000" 
              value={otp}
              maxLength="6"
              onChange={(e) => setOtp(e.target.value)} 
              required 
              style={{ width: '100%', padding: '12px 0', border: 'none', borderBottom: '2px solid #000', fontSize: '24px', letterSpacing: '8px', outline: 'none', background: 'transparent' }}
            />
            <p style={{ fontSize: '11px', marginTop: '8px', fontWeight: 'bold' }}>SENT TO: {email}</p>
          </div>

          <button type="submit" disabled={loading} style={{ padding: '14px', background: '#000', color: '#fff', border: 'none', fontWeight: '900', textTransform: 'uppercase', cursor: 'pointer' }}>
            {loading ? "Verifying..." : "Verify & Complete"}
          </button>
          
          <button type="button" onClick={() => setStep(1)} style={{ background: 'none', border: 'none', fontWeight: '700', cursor: 'pointer', fontSize: '12px', textDecoration: 'underline' }}>
            Change Email
          </button>
        </form>
      )}

      {message && (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginTop: '20px' }}>
          {isError ? <AlertCircle size={16} style={{ marginTop: '2px' }} /> : <CheckCircle2 size={16} style={{ marginTop: '2px' }} />}
          <p style={{ margin: 0, fontSize: '13px', fontWeight: '700' }}>{message}</p>
        </div>
      )}

      <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #eee', fontSize: '14px' }}>
        Already have an account?{" "}
        <button onClick={onBackToLogin} style={{ display: 'inline', background: 'none', border: 'none', color: '#000', fontWeight: '800', cursor: 'pointer', fontSize: '12px', padding: 0 }}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Register;