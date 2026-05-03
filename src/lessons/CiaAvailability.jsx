import React from 'react';
import { Wifi } from 'lucide-react';

export default function CiaAvailability() {
  return (
    <div className="lesson-step" style={{ animation: 'fadeIn 0.4s ease-out', color: '#000', textAlign: 'left' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
        <Wifi size={26} strokeWidth={2.5} />
        <h2 style={{ 
          fontSize: '28px', 
          fontWeight: '900', 
          margin: 0, 
          letterSpacing: '-0.5px',
          textTransform: 'uppercase'
        }}>
          Availability
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
          Availability is "the property of being accessible and usable on demand by an authorized entity." Authorized persons should have access to permitted resources at all times.
        </p>

        <p style={{ fontSize: '16px', lineHeight: '1.7', marginBottom: '30px', color: '#333' }}>
          This principle ensures that systems and information are consistently accessible to authorized users when needed. It protects against service disruptions and ensures business continuity by maintaining operational capability even in the face of adverse conditions.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '30px' }}>
          <div>
            <div style={{ fontWeight: '900', fontSize: '13px', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '1px' }}>
              Threats & Compromises
            </div>
            <div style={{ borderLeft: '4px solid #000', paddingLeft: '20px' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '15px', lineHeight: '2' }}>
                <li>• Denial-of-Service (DoS) attacks</li>
                <li>• Hardware failures and outages</li>
                <li>• Natural disasters and fires</li>
              </ul>
            </div>
          </div>

          <div>
            <div style={{ fontWeight: '900', fontSize: '13px', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '1px' }}>
              Security Controls
            </div>
            <div style={{ borderLeft: '4px solid #000', paddingLeft: '20px' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '15px', lineHeight: '2' }}>
                <li>• Redundant systems and failover</li>
                <li>• Load balancing and capacity planning</li>
                <li>• Disaster recovery and backups</li>
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
          Availability is a critical component of security, specifically implemented to ensure authorized users can access resources and systems when needed without interruption.
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