import React, { useState } from 'react';

export default function CiaQuiz({ onComplete, savedAnswers }) {
  const [answers, setAnswers] = useState(savedAnswers || {});
  
  const questions = [
    {
      id: 1,
      q: "How could an intruder harm the security goal of confidentiality?",
      options: ["Deleting databases", "Stealing config info", "Stealing/uploading names & emails", "It can't be harmed"],
      correct: 2
    },
    {
      id: 2,
      q: "How could an intruder harm the security goal of integrity?",
      options: ["Changing names/emails in DB", "Listening to traffic", "Bypassing access control", "Only via physical access"],
      correct: 0
    },
    {
      id: 3,
      q: "How could an intruder harm the security goal of availability?",
      options: ["Exploiting auth bugs", "Redirecting emails", "Unplugging power only", "Launching a DoS attack"],
      correct: 3
    },
    {
      id: 4,
      q: "What happens if at least one CIA goal is harmed?",
      options: ["No effect unless all 3 fail", "Security is compromised", "Acceptable if data is available", "Acceptable unless it's reading data"],
      correct: 1
    }
  ];

  const handleSelect = (qId, optIdx) => {
    const newAnswers = { ...answers, [qId]: optIdx };
    setAnswers(newAnswers);
  };

  return (
    <div className="lesson-step">
      <h3>Quiz Checklist</h3>
      {questions.map((q) => (
        <div key={q.id} style={{ marginBottom: '20px', padding: '15px', background: '#f8fafc', borderRadius: '8px' }}>
          <p style={{ fontWeight: '600', marginBottom: '10px' }}>{q.id}. {q.q}</p>
          {q.options.map((opt, idx) => (
            <label key={idx} style={{ display: 'block', marginBottom: '8px', cursor: 'pointer' }}>
              <input 
                type="radio" 
                name={`q${q.id}`} 
                checked={answers[q.id] === idx}
                onChange={() => handleSelect(q.id, idx)}
                style={{ marginRight: '10px' }}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}
      <button 
        onClick={() => onComplete(answers)}
        style={{ width: '100%', padding: '12px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
      >
        Submit Quiz Answers
      </button>
    </div>
  );
}