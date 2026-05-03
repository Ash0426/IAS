import React from 'react';

export default function CiaIntegrity() {
  return (
    <div className="lesson-step">
      <h3>Integrity</h3>
      <p>Integrity is "the property of accuracy and completeness." It means maintaining the consistency, accuracy and trustworthiness of data over its entire life cycle. Data must not be changed during transit.</p>
      
      <div style={{ marginTop: '20px' }}>
        <h4 style={{ marginBottom: '8px' }}>Methods for ensuring integrity:</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {['Hash Functions', 'Backups', 'Redundancy', 'Auditing', 'Logging'].map(item => (
            <span key={item} style={{ padding: '6px 12px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '20px', fontSize: '13px' }}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}