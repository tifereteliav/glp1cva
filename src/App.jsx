import React, { useState, useEffect } from 'react';
import { patientProfile, simulationStages } from './data/simulationData';
import WelcomeHero from './components/WelcomeHero';
import Stage1Admission from './components/Stage1Admission';
import Stage2FirstVisitData from './components/Stage2FirstVisitData';
import Stage2Titration from './components/Stage2Titration';
import Stage3AGP from './components/Stage3AGP';
import Stage4Summary from './components/Stage4Summary';
import PresentationView from './components/PresentationView';
import { Activity, Stethoscope, ChevronLeft, ChevronRight, Award, RefreshCw, Sparkles, CheckCircle2, Presentation } from 'lucide-react';

export default function App() {
  const [currentStageIndex, setCurrentStageIndex] = useState(0); // 0 = Welcome screen, 1..5 = Stages
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [quizScores, setQuizScores] = useState({ q1: null, q2: null, q3: null, q4: null });

  // Always scroll to top of page on stage transition
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [currentStageIndex]);

  // Handle 3D Perspective Door Opening Transition into Clinic Space
  const handleStartSimulation = () => {
    setDoorsOpen(true);
    setIsEntering(true);

    // After animation completes, enter clinic stage 1
    setTimeout(() => {
      setCurrentStageIndex(1);
      setIsEntering(false);
      setTimeout(() => {
        setDoorsOpen(false);
      }, 300);
    }, 1200);
  };

  const handleQuizAnswer = (questionId, isCorrect) => {
    setQuizScores(prev => ({ ...prev, [questionId]: isCorrect }));
  };

  const calculateScore = () => {
    const values = Object.values(quizScores).filter(v => v !== null);
    const correct = values.filter(v => v === true).length;
    return { correct, total: 4 };
  };

  const currentStageData = simulationStages[currentStageIndex - 1];

  return (
    <div className={`simulation-viewport ${doorsOpen ? 'doors-open' : ''}`}>
      
      {/* 3D Glass Doors Opening Overlay */}
      <div className="doors-container">
        <div className="door-panel door-left">
          <div className="door-handle" style={{ marginLeft: 'auto', marginRight: '20px' }} />
        </div>
        <div className="door-panel door-right">
          <div className="door-handle" style={{ marginRight: 'auto', marginLeft: '20px' }} />
        </div>
      </div>

      {/* Clinic Content Container */}
      <div className={`clinic-space ${isEntering ? 'entering' : 'entered'}`}>
        
        {/* Navigation Bar (When inside simulation) */}
        {currentStageIndex > 0 && (
          <header style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
            position: 'sticky',
            top: 0,
            zIndex: 50,
            padding: '14px 24px'
          }}>
            <div style={{
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              {/* App Brand & Patient Name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img src="/tiferet_eliav_logo.jpg" alt="TIFERET ELIAV Diabetes & AI" style={{ height: '48px', borderRadius: '12px', boxShadow: '0 4px 14px rgba(79, 70, 229, 0.2)', border: '1.5px solid #c7d2fe' }} />
                <div>
                  <h1 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0f172a' }}>
                    סימולציית טיפול ב-GLP1 במטופל הסובל מסוכרת והשמנה וסיבוכים נילווים
                  </h1>
                  <div style={{ fontSize: '0.84rem', color: '#4f46e5', fontWeight: 700 }}>
                    <span style={{ color: '#0284c7' }}>TIFERET ELIAV</span> • Diabetes & AI | מטופל: <strong>יעקב (בן 67)</strong> (BMI 36.1)
                  </div>
                </div>
              </div>

              {/* Progress Steps Indicators */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', padding: '4px' }}>
                {simulationStages.map((stg) => {
                  const isActive = currentStageIndex === stg.id;
                  const isCompleted = currentStageIndex > stg.id;

                  return (
                    <button
                      key={stg.id}
                      onClick={() => setCurrentStageIndex(stg.id)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '20px',
                        border: 'none',
                        background: isActive ? '#581c87'
                          : isCompleted
                          ? '#e0f2fe'
                          : '#f1f5f9',
                        color: isActive
                          ? 'white'
                          : isCompleted
                          ? '#0369a1'
                          : '#64748b',
                        fontWeight: isActive ? 800 : 600,
                        fontSize: '0.88rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {isCompleted ? <CheckCircle2 size={16} color="#0284c7" /> : null}
                      <span>{stg.id}. {stg.badge}</span>
                    </button>
                  );
                })}
              </div>

              {/* Header Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={() => setIsPresentationMode(!isPresentationMode)}
                  style={{
                    background: isPresentationMode ? 'linear-gradient(135deg, #0284c7 0%, #4f46e5 100%)' : '#eff6ff',
                    color: isPresentationMode ? 'white' : '#1d4ed8',
                    border: '1.5px solid #bfdbfe',
                    padding: '8px 16px',
                    borderRadius: '12px',
                    fontWeight: 800,
                    fontSize: '0.86rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 8px rgba(37, 99, 235, 0.15)'
                  }}
                >
                  <Presentation size={16} />
                  <span>{isPresentationMode ? 'חזרה לסימולציה 🖥️' : 'מצב מצגת 📽️'}</span>
                </button>

                {/* Reset / Exit Button */}
                <button 
                  onClick={() => {
                    setIsPresentationMode(false);
                    setCurrentStageIndex(0);
                  }}
                  className="btn-secondary"
                  style={{ fontSize: '0.85rem', padding: '8px 16px' }}
                >
                  <RefreshCw size={14} />
                  התחלה מחדש
                </button>
              </div>
            </div>
          </header>
        )}

        {/* Main Body Stage Renderer */}
        <main style={{ maxWidth: isPresentationMode ? '1350px' : '1200px', margin: '0 auto', padding: isPresentationMode ? '20px 15px' : '30px 20px 60px 20px' }}>
          
          {isPresentationMode ? (
            <PresentationView onExitToSimulation={() => setIsPresentationMode(false)} />
          ) : (
            <>
              {currentStageIndex === 0 && (
                <WelcomeHero 
                  onStart={handleStartSimulation} 
                  onOpenPresentation={() => setIsPresentationMode(true)}
                />
              )}

              {currentStageIndex === 1 && (
                <Stage1Admission
                  data={currentStageData}
                  patient={patientProfile}
                  onNext={() => setCurrentStageIndex(2)}
                />
              )}

          {currentStageIndex === 2 && (
            <Stage2FirstVisitData
              data={currentStageData}
              onNext={() => setCurrentStageIndex(3)}
              onPrev={() => setCurrentStageIndex(1)}
            />
          )}

          {currentStageIndex === 3 && (
            <Stage2Titration
              data={currentStageData}
              onNext={() => setCurrentStageIndex(4)}
              onPrev={() => setCurrentStageIndex(2)}
            />
          )}

          {currentStageIndex === 4 && (
            <Stage3AGP
              data={currentStageData}
              onNext={() => setCurrentStageIndex(5)}
              onPrev={() => setCurrentStageIndex(3)}
            />
          )}

          {currentStageIndex === 5 && (
            <Stage4Summary
              data={currentStageData}
              patient={patientProfile}
              onRestart={() => setCurrentStageIndex(1)}
              score={calculateScore()}
            />
          )}
          </>
        )}

        </main>

      </div>
    </div>
  );
}
