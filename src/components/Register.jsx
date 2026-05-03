import React, { useState } from 'react';
import { supabase } from '../../backend/config/supabaseClient';

const Register = ({ onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // New state
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages

    // 1. Frontend Validation: Check if passwords match
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    // 2. Call Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      // If "Confirm Email" is OFF in dashboard, data.session will exist
      if (data.session) {
        setMessage('Registration successful! Welcome to Rice Stress Lab.');
      } else {
        setMessage('Registration successful! Check your email for a confirmation link.');
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>
      <form onSubmit={handleRegister}>
        <input 
          type="email" 
          placeholder="Email" 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <br /><br />
        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <br /><br />
        {/* New Confirm Password Field */}
        <input 
          type="password" 
          placeholder="Confirm Password" 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          required 
        />
        <br /><br />
        
        <button type="submit">Register</button>
      </form>

      {message && (
        <p style={{ color: message.includes('successful') ? 'green' : 'red' }}>
          {message}
        </p>
      )}

      <button 
        onClick={onBackToLogin} 
        style={{ marginTop: '10px', background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}
      >
        Already have an account? Login
      </button>
    </div>
  );
};

export default Register;