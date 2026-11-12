import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExam } from '../../context/ExamContext';
import ExamHeader from '../../components/exam/ExamHeader';
import QuestionPalette from '../../components/exam/QuestionPalette';
import QuestionView from '../../components/exam/QuestionView';
import SubmitConfirmModal from '../../components/exam/SubmitConfirmModal';

export default function LiveExam() {
  const navigate = useNavigate();
  const {
    activeSession,
    selectOption,
    clearResponse,
    toggleReview,
    setCurrentQuestionIndex,
    submitExam,
  } = useExam();

  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // If no active exam session or already submitted, redirect to dashboard
  useEffect(() => {
    if (!activeSession) {
      navigate('/student/dashboard');
    }
  }, [activeSession, navigate]);

  if (!activeSession) return null;

  const currentQIndex = activeSession.currentQuestionIndex || 0;
  const questions = activeSession.questions || [];
  const currentQuestion = questions[currentQIndex];
  const selectedOption = activeSession.answers?.[currentQuestion?.id];
  const isReview = Boolean(activeSession.reviewMarks?.[currentQuestion?.id]);

  const answeredCount = Object.keys(activeSession.answers || {}).length;
  const reviewCount = Object.values(activeSession.reviewMarks || {}).filter(Boolean).length;

  const handleConfirmSubmit = () => {
    const result = submitExam();
    setShowSubmitModal(false);
    if (result) {
      navigate(`/student/results/${result.id}`);
    } else {
      navigate('/student/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/90 flex flex-col">
      {/* ── Fixed Top Exam Header ── */}
      <ExamHeader
        examName={activeSession.examName}
        candidateName={activeSession.candidateName}
        rollNo={activeSession.candidateRollNo}
        secondsLeft={activeSession.secondsLeft}
        totalSeconds={activeSession.totalSeconds}
        onSubmitClick={() => setShowSubmitModal(true)}
      />

      {/* ── Main Exam Body: Question View + Question Palette ── */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Left/Main Column: Question Panel (2 cols on lg) */}
          <div className="lg:col-span-2">
            <QuestionView
              question={currentQuestion}
              questionNumber={currentQIndex + 1}
              totalQuestions={questions.length}
              selectedOption={selectedOption}
              isReviewMarked={isReview}
              onSelectOption={(optKey) => selectOption(currentQuestion.id, optKey)}
              onClearResponse={() => clearResponse(currentQuestion.id)}
              onToggleReview={() => toggleReview(currentQuestion.id)}
              onPrev={() => setCurrentQuestionIndex(Math.max(0, currentQIndex - 1))}
              onNext={() => setCurrentQuestionIndex(Math.min(questions.length - 1, currentQIndex + 1))}
              hasPrev={currentQIndex > 0}
              hasNext={currentQIndex < questions.length - 1}
            />
          </div>

          {/* Right Column: Question Palette Sidebar (1 col on lg) */}
          <div className="lg:col-span-1 space-y-4">
            <QuestionPalette
              questions={questions}
              answers={activeSession.answers || {}}
              reviewMarks={activeSession.reviewMarks || {}}
              currentIndex={currentQIndex}
              onSelectQuestion={(idx) => setCurrentQuestionIndex(idx)}
            />

            {/* Quick Submit Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 text-center space-y-2">
              <p className="text-xs text-slate-500">
                Done with all questions? Verify your responses and complete the exam.
              </p>
              <button
                onClick={() => setShowSubmitModal(true)}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-vedic-primary hover:bg-vedic-dark text-white shadow-xs transition"
              >
                Submit Exam & View Score
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* ── Submission Confirmation Dialog ── */}
      {showSubmitModal && (
        <SubmitConfirmModal
          totalQuestions={questions.length}
          answeredCount={answeredCount}
          reviewCount={reviewCount}
          secondsLeft={activeSession.secondsLeft}
          onConfirm={handleConfirmSubmit}
          onCancel={() => setShowSubmitModal(false)}
        />
      )}
    </div>
  );
}
