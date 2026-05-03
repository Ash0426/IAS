import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import CiaIntro from './CiaIntro';
import CiaConfidentiality from './CiaConfidentiality';
import CiaIntegrity from './CiaIntegrity';
import CiaAvailability from './CiaAvailability';
import CiaQuiz from './CiaQuiz';

export default function CiaLessonContainer({ isCompleted, onComplete, savedAnswers }) {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [1, 2, 3, 4, 5];

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <CiaIntro />;
      case 2: return <CiaConfidentiality />;
      case 3: return <CiaIntegrity />;
      case 4: return <CiaAvailability />;
      case 5: return <CiaQuiz onComplete={onComplete} savedAnswers={savedAnswers} />;
      default: return <CiaIntro />;
    }
  };

  return (
    <div style={{ marginTop: '10px' }}>
      
      {/* Centered Top Navigation - Ref: image_be67c9.png inspiration */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        gap: '10px', 
        paddingBottom: '30px', 
        borderBottom: '2px solid #000',
        marginBottom: '30px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          {/* Back Button */}
          <button
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            style={{
              background: 'none',
              border: 'none',
              cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
              display: 'flex',
              opacity: currentStep === 1 ? 0.2 : 1,
              transition: 'opacity 0.2s'
            }}
          >
            <div style={{ border: '2px solid #000', borderRadius: '50%', padding: '4px' }}>
              <ArrowLeft size={18} color="#000" strokeWidth={3} />
            </div>
          </button>

          {/* Step Numbers */}
          {steps.map((num) => (
            <button
              key={num}
              onClick={() => setCurrentStep(num)}
              style={{
                width: '42px',
                height: '38px',
                borderRadius: '6px',
                border: currentStep === num ? '3px solid #000' : '1px solid #555',
                backgroundColor: currentStep === num ? '#000' : '#444',
                color: '#fff',
                fontSize: '15px',
                fontWeight: '800',
                cursor: 'pointer',
                transition: 'all 0.1s ease'
              }}
            >
              {num}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => setCurrentStep(prev => Math.min(5, prev + 1))}
            disabled={currentStep === 5}
            style={{
              background: 'none',
              border: 'none',
              cursor: currentStep === 5 ? 'not-allowed' : 'pointer',
              display: 'flex',
              opacity: currentStep === 5 ? 0.2 : 1,
              transition: 'opacity 0.2s'
            }}
          >
            <div style={{ border: '2px solid #000', borderRadius: '50%', padding: '4px' }}>
              <ArrowRight size={18} color="#000" strokeWidth={3} />
            </div>
          </button>
        </div>

        {/* Status Indicator below buttons */}
        <div style={{ fontSize: '10px', fontWeight: '900', color: '#000', letterSpacing: '2px', textTransform: 'uppercase' }}>
          {currentStep === 5 ? "Final Assessment" : `Step 0${currentStep} / 05`}
        </div>
      </div>

      {/* Lesson Content Area */}
      <div style={{ minHeight: '350px', color: '#000', animation: 'fadeIn 0.3s ease-in' }}>
        {renderStep()}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}