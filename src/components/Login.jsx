import React, { useState } from 'react';
import { supabase } from '../../backend/config/supabaseClient';
import Register from './Register'; // Import the new component

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError("Invalid credentials.");
  };

  // If the user clicked "Register", show the Register component instead
  if (isRegistering) {
    return <Register onBackToLogin={() => setIsRegistering(false)} />;
  }

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <br /><br />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <br /><br />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <hr />
      <p>Don't have an account?</p>
      <button onClick={() => setIsRegistering(true)}>Create New Account</button>
    </div>
  );
};

export default Login;