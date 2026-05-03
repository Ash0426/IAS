import React from 'react';
import { EyeOff } from 'lucide-react';

export default function CiaConfidentiality() {
  return (
    <div className="lesson-step" style={{ animation: 'fadeIn 0.4s ease-out', color: '#000', textAlign: 'left' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
        <EyeOff size={26} strokeWidth={2.5} />
        <h2 style={{ 
          fontSize: '28px', 
          fontWeight: '900', 
          margin: 0, 
          letterSpacing: '-0.5px',
          textTransform: 'uppercase'
        }}>
          Confidentiality
        </h2>
      </div>

      <div style={{ width: '100%', height: '2px', background: '#000', marginBottom: '25px' }} />

      <div style={{ maxWidth: '800px' }}>
        <p style={{ 
          fontSize: '18px', 
          lineHeight: '1.6', 
          fontWeight: '700',
          marginBottom: '20px'
        }}>
          Confidentiality ensures that sensitive information is not disclosed to unauthorized individuals, entities, or processes.
        </p>

        <p style={{ fontSize: '16px', lineHeight: '1.7', marginBottom: '30px', color: '#333' }}>
          This principle requires that only authorized users can access specific resources. It must be carefully balanced with availability to ensure that those with legitimate permissions can still perform their duties.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '30px' }}>
          <div>
            <div style={{ fontWeight: '900', fontSize: '13px', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '1px' }}>
              Threats & Compromises
            </div>
            <div style={{ borderLeft: '4px solid #000', paddingLeft: '20px' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '15px', lineHeight: '2' }}>
                <li>• Database password breaches</li>
                <li>• Misdirected sensitive emails</li>
                <li>• Network eavesdropping</li>
              </ul>
            </div>
          </div>

          <div>
            <div style={{ fontWeight: '900', fontSize: '13px', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '1px' }}>
              Security Controls
            </div>
            <div style={{ borderLeft: '4px solid #000', paddingLeft: '20px' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '15px', lineHeight: '2' }}>
                <li>• Robust data encryption</li>
                <li>• Multi-factor authentication</li>
                <li>• Biometric verification</li>
              </ul>
            </div>
          </div>

        </div>

        <p style={{ 
          fontSize: '14px', 
          lineHeight: '1.6', 
          color: '#666', 
          marginTop: '40px',
          borderTop: '1px solid #eee',
          paddingTop: '15px'
        }}>
          Confidentiality is a core component of privacy, specifically implemented to protect resources from unauthorized entities.
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