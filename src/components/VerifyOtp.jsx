import { useState } from 'react';
import { supabase } from '../../backend/config/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function VerifyOtp({ email }) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleVerify = async (e) => {
  e.preventDefault();
  setError(null);

  const { data, error } = await supabase.auth.verifyOtp({
    email: email,
    token: otp,
    type: 'signup'
  });

    if (error) {
      setError(error.message);
    } else {
      navigate('/dashboard');
    }
  };



  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Verify Your Account</h2>
      <p>Enter the code sent to: <strong>{email}</strong></p>
      <form onSubmit={handleVerify}>
        <input 
          type="text" 
          placeholder="6-digit code" 
          value={otp} 
          onChange={(e) => setOtp(e.target.value)} 
          required 
        />
        <button type="submit">Verify Code</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}