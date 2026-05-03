import React from 'react';
import { Shield } from 'lucide-react';

export default function CiaIntro() {
  return (
    <div className="lesson-step" style={{ animation: 'fadeIn 0.4s ease-out', color: '#000', textAlign: 'left' }}>
      
      {/* Header Section - Left Aligned */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
        <Shield size={26} strokeWidth={2.5} />
        <h2 style={{ 
          fontSize: '28px', 
          fontWeight: '900', 
          margin: 0, 
          letterSpacing: '-0.5px',
          textTransform: 'uppercase'
        }}>
          The CIA Triad
        </h2>
      </div>

      {/* Horizontal Divider */}
      <div style={{ width: '100%', height: '2px', background: '#000', marginBottom: '25px' }} />

      {/* Content Body */}
      <div style={{ maxWidth: '800px' }}>
        <p style={{ 
          fontSize: '18px', 
          lineHeight: '1.6', 
          fontWeight: '700',
          marginBottom: '20px',
          color: '#000'
        }}>
          The CIA Triad—Confidentiality, Integrity, and Availability—is the baseline model for information security.
        </p>

        <p style={{ fontSize: '16px', lineHeight: '1.7', marginBottom: '25px', color: '#333' }}>
          These three elements are considered the most crucial components and should be guaranteed in any secure system. They serve as the primary pillars for evaluating and implementing security regardless of the underlying system.
        </p>

        {/* Emphasis Section */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{ 
            fontWeight: '900', 
            fontSize: '13px', 
            textTransform: 'uppercase', 
            marginBottom: '8px',
            letterSpacing: '1px'
          }}>
            Operational Risk
          </div>
          <div style={{ borderLeft: '4px solid #000', paddingLeft: '20px' }}>
            <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.5', fontWeight: '500' }}>
              Serious consequences can result if even one of these elements is breached. A failure in a single pillar compromises the integrity of the entire security infrastructure.
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <p style={{ 
          fontSize: '14px', 
          lineHeight: '1.6', 
          color: '#666', 
          marginTop: '40px',
          borderTop: '1px solid #eee',
          paddingTop: '15px'
        }}>
          This model provides a universal standard for assessing security frameworks within any organization.
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}