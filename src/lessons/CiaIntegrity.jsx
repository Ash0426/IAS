import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function CiaIntegrity() {
  return (
    <div className="lesson-step" style={{ animation: 'fadeIn 0.4s ease-out', color: '#000', textAlign: 'left' }}>
      
      {/* Header Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
        <CheckCircle size={26} strokeWidth={2.5} />
        <h2 style={{ 
          fontSize: '28px', 
          fontWeight: '900', 
          margin: 0, 
          letterSpacing: '-0.5px',
          textTransform: 'uppercase'
        }}>
          Integrity
        </h2>
      </div>

      {/* Horizontal Divider */}
      <div style={{ width: '100%', height: '2px', background: '#000', marginBottom: '25px' }} />

      {/* Definition Body */}
      <div style={{ maxWidth: '800px' }}>
        <p style={{ 
          fontSize: '18px', 
          lineHeight: '1.6', 
          fontWeight: '700',
          marginBottom: '20px'
        }}>
          Integrity is "the property of accuracy and completeness." It means maintaining the consistency, accuracy and trustworthiness of data over its entire life cycle. Data must not be changed during transit.
        </p>

        <p style={{ fontSize: '16px', lineHeight: '1.7', marginBottom: '30px', color: '#333' }}>
          This principle ensures that information remains accurate and unaltered unless authorized. It protects against accidental modifications and intentional tampering, providing assurance that data is reliable and trustworthy throughout all operations.
        </p>

        {/* Two-Column Content without Boxes */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '30px' }}>
          
          {/* Threats Section */}
          <div>
            <div style={{ fontWeight: '900', fontSize: '13px', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '1px' }}>
              Threats & Compromises
            </div>
            <div style={{ borderLeft: '4px solid #000', paddingLeft: '20px' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '15px', lineHeight: '2' }}>
                <li>• Unauthorized data modification</li>
                <li>• Data corruption during transmission</li>
                <li>• Malware and ransomware attacks</li>
              </ul>
            </div>
          </div>

          {/* Methods Section */}
          <div>
            <div style={{ fontWeight: '900', fontSize: '13px', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '1px' }}>
              Methods for Ensuring Integrity
            </div>
            <div style={{ borderLeft: '4px solid #000', paddingLeft: '20px' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '15px', lineHeight: '2' }}>
                <li>• Hash functions and checksums</li>
                <li>• Backups and redundancy systems</li>
                <li>• Comprehensive auditing and logging</li>
              </ul>
            </div>
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
          Integrity is a critical component of data security, specifically implemented to detect and prevent unauthorized or accidental changes.
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