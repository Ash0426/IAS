import React, { useState } from 'react';
import { supabase } from '../../backend/config/supabaseClient';
import { ShieldCheck, Lock, Mail, AlertCircle, Eye, EyeOff } from 'lucide-react';
import Register from './Register';

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const validatePassword = (pass) => {
    const strongPassword = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    return strongPassword.test(pass);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validatePassword(password)) {
      setError("Security Policy: Password must be 8+ characters and include one special character.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError("Access Denied: Invalid credentials.");
  };

  if (isRegistering) {
    return <Register onBackToLogin={() => setIsRegistering(false)} />;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '80px auto', padding: '0 20px', textAlign: 'left', color: '#000' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
        <ShieldCheck size={28} strokeWidth={2.5} />
        <h2 style={{ fontSize: '26px', fontWeight: '900', margin: 0, textTransform: 'uppercase' }}> Login</h2>
      </div>
      <div style={{ width: '100%', height: '2px', background: '#000', marginBottom: '30px' }} />

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '8px' }}>
            <Mail size={14} />  Email
          </label>
          <input 
            type="email" 
            placeholder="user@webgoat.local" 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', padding: '12px 0', border: 'none', borderBottom: '2px solid #000', fontSize: '16px', outline: 'none', background: 'transparent' }}
          />
        </div>

        <div style={{ position: 'relative' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '8px' }}>
            <Lock size={14} /> Password
          </label>
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="********" 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '12px 0', border: 'none', borderBottom: '2px solid #000', fontSize: '16px', outline: 'none', background: 'transparent' }}
          />
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{ position: 'absolute', right: 0, bottom: '12px', background: 'none', border: 'none', cursor: 'pointer', color: '#000' }}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {error && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: '#000' }}>
            <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
            <p style={{ margin: 0, fontSize: '13px', fontWeight: '700' }}>{error}</p>
          </div>
        )}

        <button type="submit" style={{ padding: '14px', background: '#000', color: '#fff', border: 'none', fontWeight: '900', textTransform: 'uppercase', cursor: 'pointer' }}>
          Login
        </button>
      </form>

      <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #eee' }}> Don't have an account?{" "}
        <button onClick={() => setIsRegistering(true)} style={{ background: 'none', border: 'none', color: '#000', fontWeight: '800', cursor: 'pointer', fontSize: '17px' }}>
          Signup
        </button>
      </div>
    </div>
  );
};

export default Login;