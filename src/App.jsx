import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../backend/config/supabaseClient';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import VerifyOtp from './components/VerifyOtp';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [signupEmail, setSignupEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) navigate('/');
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif', fontWeight: '900' }}>
        INITIALIZING SYSTEM...
      </div>
    );
  }

  return (
    <Routes>
      <Route 
        path="/" 
        element={!session ? <Login onSignupStarted={(email) => setSignupEmail(email)} /> : <Navigate to="/dashboard" />} 
      />
      <Route 
        path="/verify-otp" 
        element={<VerifyOtp email={signupEmail} />} 
      />
    <Route 
      path="/dashboard" 
      element={session ? <Dashboard onLogout={() => setSession(null)} /> : <Navigate to="/" />} 
    />
    </Routes>
  );
}

export default App;