import React, { useState, useEffect } from 'react';
import { supabase } from '../../backend/config/supabaseClient';
import { ClipboardCheck, AlertCircle, CheckCircle2, XCircle, CheckCircle, RefreshCcw } from 'lucide-react';

export default function CiaQuiz({ onComplete, savedAnswers }) {
  const [answers, setAnswers] = useState(savedAnswers || {});
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [submitted, setSubmitted] = useState(false);

  // Logic to clear state for a retake
  const handleReset = () => {
  setAnswers({});
  setSubmitted(false);
  setStatus({ type: '', msg: '' });
  if (onRetake) onRetake(); // Notify dashboard to change status to IN_PROGRESS
  };

  const questions = [
    {
      id: 1,
      q: "How could an intruder harm the security goal of confidentiality?",
      options: [
        "By deleting all the databases.",
        "By stealing a database where general configuration information for the system is stored.",
        "By stealing a database where names and emails are stored and uploading it to a website.",
        "Confidentiality can't be harmed by an intruder."
      ],
      correct: 2
    },
    {
      id: 2,
      q: "How could an intruder harm the security goal of integrity?",
      options: [
        "By changing the names and emails of one or more users stored in a database.",
        "By listening to incoming and outgoing network traffic.",
        "By bypassing the access control mechanisms used to manage database access.",
        "Integrity can only be harmed when the intruder has physical access to the database."
      ],
      correct: 0
    },
    {
      id: 3,
      q: "How could an intruder harm the security goal of availability?",
      options: [
        "By exploiting a software bug that allows the attacker to bypass the normal authentication mechanisms for a database.",
        "By redirecting sensitive emails to other individuals.",
        "Availability can only be harmed by unplugging the power supply of the storage devices.",
        "By launching a denial of service attack on the servers."
      ],
      correct: 3
    },
    {
      id: 4,
      q: "What happens if at least one of the CIA security goals is harmed?",
      options: [
        "All three goals must be harmed for the system's security to be compromised.",
        "The system's security is compromised even if only one goal is harmed.",
        "It is acceptable if an attacker reads or changes data since at least some data is available.",
        "It is acceptable if an attacker changes data, but reading sensitive data is not tolerable."
      ],
      correct: 1
    }
  ];

  const handleSelect = (qId, optIdx) => {
    if (submitted) return; 
    setAnswers({ ...answers, [qId]: optIdx });
  };

  const handleSubmit = async () => {
    if (submitted) return;

    let score = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct) score++;
    });

    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      setStatus({ type: 'error', msg: 'No active session found.' });
      return;
    }

    try {
      const { error } = await supabase
        .from('quiz_scores')
        .insert([{ 
          user_id: session.user.id,
          score: score, 
          total_questions: questions.length 
        }]);

      if (error) throw error;

      setSubmitted(true);
      setStatus({ type: 'success', msg: `Score Recorded: ${score}/${questions.length}` });
      if (onComplete) onComplete(answers, score);
    } catch (err) {
      setStatus({ type: 'error', msg: 'Error: ' + err.message });
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px', textAlign: 'left', color: '#000' }}>
      {/* HEADER WITH REFRESH BUTTON */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ClipboardCheck size={28} strokeWidth={2.5} />
          <h2 style={{ fontSize: '26px', fontWeight: '900', margin: 0, textTransform: 'uppercase' }}>Quiz </h2>
        </div>
        
        {/* The Refresh/Retake Button */}
        <button 
          onClick={handleReset}
          title="Retake Quiz"
          style={{ 
            background: '#000', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '4px', 
            padding: '8px 12px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '800',
            transition: 'opacity 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
          onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
        >
          <RefreshCcw size={16} /> Retake
        </button>
      </div>

      <div style={{ width: '100%', height: '2px', background: '#000', marginBottom: '30px' }} />

      {questions.map((q) => (
        <div key={q.id} style={{ marginBottom: '30px', borderLeft: '4px solid #000', paddingLeft: '20px' }}>
          <p style={{ fontWeight: '800', fontSize: '16px', marginBottom: '15px', textTransform: 'uppercase' }}>
            {q.id}. {q.q}
          </p>
          {q.options.map((opt, idx) => {
            const isSelected = answers[q.id] === idx;
            const isCorrect = q.correct === idx;
            let bgColor = 'transparent';
            let textColor = '#000';

            if (submitted) {
              if (isCorrect) { bgColor = '#dcfce7'; textColor = '#166534'; }
              else if (isSelected && !isCorrect) { bgColor = '#fee2e2'; textColor = '#991b1b'; }
            }

            return (
              <label 
                key={idx} 
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', 
                  cursor: submitted ? 'default' : 'pointer', fontSize: '14px', padding: '8px',
                  background: bgColor, color: textColor, borderRadius: '4px', border: isSelected ? '1px solid #000' : '1px solid transparent'
                }}
              >
                <input 
                  type="radio" 
                  name={`q${q.id}`} 
                  checked={isSelected}
                  onChange={() => handleSelect(q.id, idx)}
                  disabled={submitted}
                  style={{ accentColor: '#000', width: '18px', height: '18px' }}
                />
                <span style={{ flex: 1 }}>{opt}</span>
                {submitted && isCorrect && <CheckCircle size={16} />}
                {submitted && isSelected && !isCorrect && <XCircle size={16} />}
              </label>
            );
          })}
        </div>
      ))}

      {status.msg && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', padding: '15px', background: status.type === 'error' ? '#fee2e2' : '#dcfce7', borderRadius: '4px', fontWeight: '700' }}>
          {status.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
          {status.msg}
        </div>
      )}

      {!submitted && (
        <button 
          onClick={handleSubmit}
          style={{ width: '100%', padding: '16px', background: '#000', color: '#fff', border: 'none', fontWeight: '900', textTransform: 'uppercase', cursor: 'pointer', letterSpacing: '1px' }}
        >
          Submit Answer
        </button>
      )}
    </div>
  );
}