import { useEffect, useState } from 'react';
import { supabase } from '../../backend/config/supabaseClient';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('username, full_name')
          .eq('id', user.id)
          .single();

        if (error) console.error("Error fetching profile:", error);
        else setProfile(data);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      {profile ? (
        <h1>Welcome, {profile.username}!</h1>
      ) : (
        <p>Loading profile details from database...</p>
      )}
      <button onClick={() => window.history.back()}>Back to Dashboard</button>
    </div>
  );
};

// THIS IS THE LINE YOU ARE MISSING:
export default ProfilePage;