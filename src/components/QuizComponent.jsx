import React, { useState, useEffect } from 'react';
import { HelpCircle, CheckCircle2, XCircle, Info, ArrowLeft } from 'lucide-react';

export default function QuizComponent({ question, onAnswer }) {
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Guarantee state reset whenever a new question is loaded
  useEffect(() => {
    setSelectedOptionId(null);
    setIsSubmitted(false);
  }, [question?.id, question?.text]);

  const selectedOption = question.options.find(opt => opt.id === selectedOptionId);

  const handleSubmit = () => {
    if (!selectedOptionId) return;
    setIsSubmitted(true);
    if (onAnswer && selectedOption) {
      onAnswer(selectedOption.isCorrect);
    }
  };

  return (
    <div className="glass-card" style={{
      padding: '30px',
      marginTop: '30px',
      border: '2px solid rgba(2, 132, 199, 0.2)',
      background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,247,255,0.9) 100%)'
    }}>
      {/* Quiz Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
        <div style={{
          background: '#e0f2fe',
          color: '#0284c7',
          padding: '10px',
          borderRadius: '14px',
          display: 'flex'
        }}>
          <HelpCircle size={24} />
        </div>
        <div>
          <span className="badge badge-gold" style={{ marginBottom: '4px' }}>שאלת התנסות קלינית</span>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
            דילמה קלינית וקבלת החלטה
          </h3>
        </div>
      </div>

      {/* Question Text */}
      <p style={{
        fontSize: '1.1rem',
        fontWeight: 600,
        color: '#1e293b',
        lineHeight: 1.6,
        marginBottom: '24px',
        background: '#ffffff',
        padding: '16px 20px',
        borderRadius: '14px',
        borderRight: '4px solid #0284c7',
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
      }}>
        {question.text}
      </p>

      {/* Options List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
        {question.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          let borderStyle = '1px solid #cbd5e1';
          let bgStyle = 'white';

          if (isSubmitted) {
            if (opt.isCorrect) {
              borderStyle = '2px solid #10b981';
              bgStyle = '#ecfdf5';
            } else if (isSelected && !opt.isCorrect) {
              borderStyle = '2px solid #ef4444';
              bgStyle = '#fef2f2';
            }
          } else if (isSelected) {
            borderStyle = '2px solid #0284c7';
            bgStyle = '#f0f9ff';
          }

          return (
            <div
              key={opt.id}
              onClick={() => !isSubmitted && setSelectedOptionId(opt.id)}
              style={{
                padding: '16px 20px',
                borderRadius: '14px',
                border: borderStyle,
                background: bgStyle,
                cursor: isSubmitted ? 'default' : 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px'
              }}
            >
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: isSelected ? '7px solid #0284c7' : '2px solid #94a3b8',
                flexShrink: 0,
                marginTop: '2px',
                transition: 'all 0.2s ease',
                background: 'white'
              }} />
              <div style={{ flex: 1, fontSize: '1rem', color: '#1e293b', lineHeight: 1.5, fontWeight: isSelected ? 600 : 400 }}>
                {opt.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action & Feedback */}
      {!isSubmitted ? (
        <div style={{ textAlign: 'left' }}>
          <button
            onClick={handleSubmit}
            disabled={!selectedOptionId}
            className="btn-primary"
            style={{
              opacity: selectedOptionId ? 1 : 0.5,
              cursor: selectedOptionId ? 'pointer' : 'not-allowed'
            }}
          >
            אישור תשובה
            <ArrowLeft size={20} />
          </button>
        </div>
      ) : (
        <div style={{
          padding: '20px',
          borderRadius: '16px',
          background: selectedOption?.isCorrect ? '#f0fdf4' : '#fff1f2',
          border: `1.5px solid ${selectedOption?.isCorrect ? '#a7f3d0' : '#fecdd3'}`,
          display: 'flex',
          gap: '14px',
          alignItems: 'flex-start'
        }}>
          {selectedOption?.isCorrect ? (
            <CheckCircle2 size={28} color="#10b981" style={{ flexShrink: 0 }} />
          ) : (
            <XCircle size={28} color="#ef4444" style={{ flexShrink: 0 }} />
          )}
          <div>
            <h4 style={{
              fontSize: '1.1rem',
              fontWeight: 800,
              color: selectedOption?.isCorrect ? '#065f46' : '#9f1239',
              marginBottom: '6px'
            }}>
              {selectedOption?.isCorrect ? 'תשובה נכונה! כל הכבוד.' : 'תשובה לא מדויקת.'}
            </h4>
            <p style={{
              fontSize: '0.98rem',
              color: selectedOption?.isCorrect ? '#047857' : '#be123c',
              lineHeight: 1.5
            }}>
              {selectedOption?.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
