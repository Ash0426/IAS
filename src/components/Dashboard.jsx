import React, { useEffect, useState } from "react";
import { LogOut, ExternalLink, ShieldAlert, Info, User, AlertTriangle, Mail } from "lucide-react";
import { supabase } from "../../backend/config/supabaseClient";
import CiaLessonContainer from "../lessons/CiaLessonContainer";

const BLACK = "#000000";
const WHITE = "#FFFFFF";
const GRAY_BORDER = "#e5e5e5";
const GRAY_HOVER = "#222222";

export default function Dashboard({ onLogout }) {
  const [webGoatUrl, setWebGoatUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isProfileHovered, setIsProfileHovered] = useState(false);

  const [ciaCompleted, setCiaCompleted] = useState(false);
  const [ciaAnswers, setCiaAnswers] = useState(null); 

  useEffect(() => {
  const setupDashboard = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setUserEmail(session.user.email);
      
      // check quiz score from database
      const { data } = await supabase
        .from('quiz_scores')
        .select('score')
        .eq('user_id', session.user.id)
        .limit(1);

      if (data && data.length > 0) {
        setCiaCompleted(true);
      }
      setLoading(false);
    }
  };
  setupDashboard();
}, []);

  const handleCiaComplete = (answers, score) => {
  // mark CIA as completed
  setCiaCompleted(true);
  setCiaAnswers(answers); 
};

  const confirmLogout = async () => {
    await supabase.auth.signOut(); 
    onLogout();
  };

  return (
    <div style={{ padding: "40px 5%", maxWidth: "1000px", margin: "0 auto", fontFamily: "sans-serif", backgroundColor: WHITE, minHeight: "100vh" }}>
      
      <style>{`
        .dash-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; gap: 16px; flex-wrap: wrap; }
        .dash-actions { display: flex; gap: 12px; position: relative; }
        .btn-outline { display: flex; align-items: center; gap: 8px; padding: 8px 16px; background: ${WHITE}; color: ${BLACK}; border: 1px solid ${BLACK}; border-radius: 6px; cursor: pointer; font-weight: 600; transition: all 0.2s; position: relative; }
        .btn-outline:hover { background: #f4f4f4; }
        .btn-solid { display: flex; align-items: center; gap: 8px; padding: 8px 16px; background: ${BLACK}; color: ${WHITE}; border: 1px solid ${BLACK}; border-radius: 6px; cursor: pointer; font-weight: 600; transition: all 0.2s; }
        .btn-solid:hover { background: ${GRAY_HOVER}; }
        
        .profile-tooltip {
          position: absolute;
          top: 45px;
          right: 0;
          background: ${WHITE};
          border: 2px solid ${BLACK};
          padding: 12px 16px;
          width: 250px;
          z-index: 100;
          box-shadow: 6px 6px 0px rgba(0,0,0,0.1);
        }

        @media (max-width: 600px) {
          .dash-header { flex-direction: column; }
          .dash-actions { width: 100%; }
          .dash-actions button { flex: 1; justify-content: center; }
          .profile-tooltip { right: auto; left: 0; top: 50px; }
        }
      `}</style>

      <div className="dash-header">
        <div>
          <h1 style={{ fontSize: "24px", color: BLACK, fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px" , textAlign:"left"}}>
            Dashboard
          </h1>
        </div>

        <div className="dash-actions">
          <div 
            onMouseEnter={() => setIsProfileHovered(true)}
            onMouseLeave={() => setIsProfileHovered(false)}
            style={{ position: "relative" }}
          >
            <button className="btn-outline">
              <User size={16} /> Profile
            </button>

            {isProfileHovered && (
              <div className="profile-tooltip">
                <p style={{ fontSize: "10px", fontWeight: "900", color: "#666", marginBottom: "4px", textTransform: "uppercase", textAlign: "left" }}>
                  User Account
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: BLACK }}>
                  <Mail size={14} />
                  <span style={{ fontSize: "13px", fontWeight: "700", wordBreak: "break-all" }}>
                    {userEmail || "Fetching..."}
                  </span>
                </div>
              </div>
            )}
          </div>
          
          <button className="btn-solid" onClick={() => setShowLogoutModal(true)}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      <div style={{ background: WHITE, border: `2px solid ${BLACK}`, padding: "30px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", borderBottom: `1px solid ${GRAY_BORDER}`, paddingBottom: "15px" }}>
          <div>
            <h2 style={{ fontSize: "20px", color: BLACK, margin: 0, fontWeight: "700" }}>Module: CIA Triad</h2>
            <p style={{ color: BLACK, fontSize: "12px", marginTop: "4px", fontWeight: "bold" , textAlign: "left"}}>
              STATUS: {ciaCompleted ? <span style={{ textDecoration: "underline" }}>COMPLETED</span> : <span>IN_PROGRESS</span>}
            </p>
          </div>
        </div>

        <p style={{ color: BLACK, fontSize: "15px", lineHeight: "1.6", marginBottom: "20px" }}>
          The CIA Triad is the industry standard for information security. Complete the training modules below to synchronize your progress.
        </p>

        <CiaLessonContainer 
          isCompleted={ciaCompleted} 
          onComplete={handleCiaComplete} 
          savedAnswers={ciaAnswers}
          onRetake={() => setCiaCompleted(false)} 
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "30px" }}>
          {loading ? (
            <p style={{ color: "#666", fontStyle: "italic" }}>Establishing secure handshake...</p>
          ) : (
            <div>
              <a 
                href={webGoatUrl} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 28px", background: BLACK, color: WHITE, textDecoration: "none", fontWeight: "700", border: `1px solid ${BLACK}` }}
              >
                INITIALIZE WEBGOAT <ExternalLink size={16} />
              </a>
            </div>
          )}

          <div style={{ background: "#f4f4f4", border: `1px solid ${BLACK}`, padding: "12px 16px" }}>
            <p style={{ fontSize: "12px", color: BLACK, display: "flex", alignItems: "center", gap: "8px", margin: 0, fontWeight: "500" }}>
              <Info size={14} />
              <span>SYSTEM NOTE: Local WSL environment active. All session data is encrypted and synced.</span>
            </p>
          </div>
        </div>
      </div>

      {showLogoutModal && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 150 }}>
          <div style={{ background: WHITE, padding: "30px", border: `3px solid ${BLACK}`, width: "100%", maxWidth: "400px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <AlertTriangle size={24} color={BLACK} />
              <h3 style={{ margin: 0, fontSize: "18px", color: BLACK, fontWeight: "800" }}>TERMINATE SESSION?</h3>
            </div>
            <p style={{ color: BLACK, marginBottom: "24px" }}>Confirming will securely end your current instruction session.</p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <button onClick={() => setShowLogoutModal(false)} style={{ padding: "8px 20px", background: WHITE, color: BLACK, border: `1px solid ${BLACK}`, cursor: "pointer", fontWeight: "600" }}>CANCEL</button>
              <button onClick={confirmLogout} style={{ padding: "8px 20px", background: BLACK, color: WHITE, border: "none", cursor: "pointer", fontWeight: "600" }}>LOGOUT</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}