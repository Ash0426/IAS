import React from 'react';

export default function CiaAvailability() {
  return (
    <div className="lesson-step">
      <h3>Availability</h3>
      <p>Availability is "the property of being accessible and usable on demand by an authorized entity." Authorized persons should have access to permitted resources at all times.</p>
      
      <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', padding: '15px', borderRadius: '8px', marginTop: '15px' }}>
        <strong>Common Threats:</strong>
        <p style={{ margin: '5px 0 0', fontSize: '14px' }}>Denial-of-Service (DoS) attacks, hardware failures, and natural disasters like fire or floods.</p>
      </div>
    </div>
  );
}