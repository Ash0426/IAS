import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../backend/config/supabaseClient';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProfilePage from './components/ProfilePage'; // 1. Import it here

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Routes>
      <Route path="/" element={!session ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={session ? <Dashboard /> : <Navigate to="/" />} />
      
      {/* 2. Add the Profile Route here */}
      <Route 
        path="/profile" 
        element={session ? <ProfilePage /> : <Navigate to="/" />} 
      />
    </Routes>
  );
}

export default App;