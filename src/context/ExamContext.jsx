import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { INITIAL_EXAMS } from '../data/initialExams';
import { INITIAL_QUESTION_BANK } from '../data/questionBank';
import { apiClient } from '../services/apiClient';

const ExamContext = createContext();

export function ExamProvider({ children }) {
  // ── Contests / Exams list ──
  const [exams, setExams] = useState(() => {
    try {
      const saved = localStorage.getItem('gita_portal_exams');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_EXAMS;
  });

  // ── Question Bank ──
  const [questions, setQuestions] = useState(() => {
    try {
      const saved = localStorage.getItem('gita_portal_questions');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_QUESTION_BANK;
  });

  // ── Registered Candidates ──
  const [candidates, setCandidates] = useState(() => {
    try {
      const saved = localStorage.getItem('gita_portal_candidates');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  // ── Exam Results & Generated Certificates ──
  const [results, setResults] = useState(() => {
    try {
      const saved = localStorage.getItem('gita_portal_results');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  // ── Current Active Exam Attempt (Session) ──
  const [activeSession, setActiveSession] = useState(() => {
    try {
      const saved = localStorage.getItem('gita_portal_active_session');
      if (saved) return JSON.parse(saved);
    } catch {}
    return null;
  });

  // Persist state changes
  useEffect(() => {
    // Graceful background sync with live backend
    apiClient
      .getExams()
      .then((backendExams) => {
        if (Array.isArray(backendExams) && backendExams.length > 0) {
          setExams(backendExams);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    localStorage.setItem('gita_portal_exams', JSON.stringify(exams));
  }, [exams]);

  useEffect(() => {
    localStorage.setItem('gita_portal_questions', JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    localStorage.setItem('gita_portal_candidates', JSON.stringify(candidates));
  }, [candidates]);

  useEffect(() => {
    localStorage.setItem('gita_portal_results', JSON.stringify(results));
  }, [results]);

  useEffect(() => {
    if (activeSession) {
      localStorage.setItem('gita_portal_active_session', JSON.stringify(activeSession));
    } else {
      localStorage.removeItem('gita_portal_active_session');
    }
  }, [activeSession]);

  // Timer loop for active session
  useEffect(() => {
    if (!activeSession || activeSession.isSubmitted) return;

    const interval = setInterval(() => {
      setActiveSession((prev) => {
        if (!prev || prev.isSubmitted) return prev;
        if (prev.secondsLeft <= 1) {
          // Time expired! Auto-submit
          clearInterval(interval);
          handleAutoSubmit(prev);
          return { ...prev, secondsLeft: 0, isSubmitted: true };
        }
        return { ...prev, secondsLeft: prev.secondsLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeSession?.examId, activeSession?.isSubmitted]);

  // ── Actions ──

  const registerCandidate = (formData, targetExamId) => {
    const rollNo = `GLC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCandidate = {
      id: `c-${Date.now()}`,
      rollNo,
      examId: targetExamId,
      name: formData.name,
      email: formData.email,
      phone: formData.phone || '',
      school: formData.school || 'Self Study',
      city: formData.city || 'National',
      category: formData.category || 'Senior',
      registeredAt: new Date().toISOString(),
      status: 'confirmed'
    };
    setCandidates(prev => [newCandidate, ...prev]);
    return newCandidate;
  };

  const startExam = (examId, candidateInfo) => {
    const exam = exams.find(e => e.id === examId) || exams[0];
    // Select relevant questions
    const examQuestions = questions.slice(0, exam.totalQuestions || 10);
    const totalSeconds = (exam.durationMinutes || 30) * 60;

    const newSession = {
      sessionId: `sess-${Date.now()}`,
      examId: exam.id,
      examName: exam.name,
      examBadge: exam.badge,
      durationMinutes: exam.durationMinutes,
      totalSeconds,
      secondsLeft: totalSeconds,
      startedAt: new Date().toISOString(),
      candidateName: candidateInfo?.name || "Student",
      candidateRollNo: candidateInfo?.rollNo || `GLC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      candidateCity: candidateInfo?.city || "India",
      questions: examQuestions,
      answers: {}, // questionId -> selectedKey ('A', 'B', etc)
      reviewMarks: {}, // questionId -> boolean
      currentQuestionIndex: 0,
      isSubmitted: false
    };

    setActiveSession(newSession);
    return newSession;
  };

  const selectOption = (questionId, optionKey) => {
    setActiveSession(prev => {
      if (!prev || prev.isSubmitted) return prev;
      return {
        ...prev,
        answers: {
          ...prev.answers,
          [questionId]: optionKey
        }
      };
    });
  };

  const clearResponse = (questionId) => {
    setActiveSession(prev => {
      if (!prev || prev.isSubmitted) return prev;
      const nextAnswers = { ...prev.answers };
      delete nextAnswers[questionId];
      return {
        ...prev,
        answers: nextAnswers
      };
    });
  };

  const toggleReview = (questionId) => {
    setActiveSession(prev => {
      if (!prev || prev.isSubmitted) return prev;
      return {
        ...prev,
        reviewMarks: {
          ...prev.reviewMarks,
          [questionId]: !prev.reviewMarks?.[questionId]
        }
      };
    });
  };

  const setCurrentQuestionIndex = (index) => {
    setActiveSession(prev => {
      if (!prev) return prev;
      return { ...prev, currentQuestionIndex: index };
    });
  };

  const calculateScore = (session) => {
    const exam = exams.find(e => e.id === session.examId) || exams[0];
    const sessionQuestions = session.questions || [];
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;
    let obtainedMarks = 0;
    let totalMarks = 0;

    sessionQuestions.forEach(q => {
      const qMarks = Number(q.marks || 2);
      const negMarks = exam.negativeMarking ? Number(q.negativeMarks || exam.negativeMarkValue || 0) : 0;
      totalMarks += qMarks;

      const userAns = session.answers?.[q.id];
      if (!userAns) {
        unattempted++;
      } else if (userAns === q.correctAnswer) {
        correct++;
        obtainedMarks += qMarks;
      } else {
        incorrect++;
        obtainedMarks = Math.max(0, obtainedMarks - negMarks);
      }
    });

    const percentage = totalMarks > 0 ? ((obtainedMarks / totalMarks) * 100).toFixed(1) : 0;
    const isPass = Number(obtainedMarks) >= Number(exam.passingMarks || totalMarks * 0.4);
    
    let meritTier = "Participant";
    if (percentage >= 90) meritTier = "Gold Distinction (Top 5%)";
    else if (percentage >= 75) meritTier = "Silver Merit (Top 15%)";
    else if (percentage >= 50) meritTier = "Bronze Achiever";

    const certId = `CERT-GLC-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const resultRecord = {
      id: `res-${Date.now()}`,
      certificateId: certId,
      examId: session.examId,
      examName: session.examName,
      candidateName: session.candidateName,
      rollNo: session.candidateRollNo,
      city: session.candidateCity,
      submittedAt: new Date().toISOString(),
      totalQuestions: sessionQuestions.length,
      attempted: correct + incorrect,
      correct,
      incorrect,
      unattempted,
      score: Number(obtainedMarks.toFixed(1)),
      totalMarks,
      percentage: Number(percentage),
      timeSpentSeconds: session.totalSeconds - session.secondsLeft,
      resultStatus: isPass ? "pass" : "fail",
      meritTier,
      answers: session.answers,
      questions: sessionQuestions
    };

    return resultRecord;
  };

  const handleAutoSubmit = (session) => {
    const result = calculateScore(session);
    setResults(prev => [result, ...prev]);
    localStorage.removeItem('gita_portal_active_session');
    return result;
  };

  const submitExam = () => {
    if (!activeSession) return null;
    const result = calculateScore(activeSession);
    setResults(prev => [result, ...prev]);
    setActiveSession(prev => ({ ...prev, isSubmitted: true }));
    localStorage.removeItem('gita_portal_active_session');
    return result;
  };

  // ── Admin Exam & Question Management ──
  const addExam = (newExam) => {
    const exam = {
      ...newExam,
      id: `exam-${Date.now()}`,
      slug: newExam.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      status: 'active'
    };
    setExams(prev => [exam, ...prev]);
    return exam;
  };

  const updateExam = (id, updatedFields) => {
    setExams(prev => prev.map(e => e.id === id ? { ...e, ...updatedFields } : e));
  };

  const deleteExam = (id) => {
    setExams(prev => prev.filter(e => e.id !== id));
  };

  const addQuestion = (newQ) => {
    const q = {
      ...newQ,
      id: `q-${Date.now()}`
    };
    setQuestions(prev => [q, ...prev]);
    return q;
  };

  const updateQuestion = (id, updatedFields) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, ...updatedFields } : q));
  };

  const deleteQuestion = (id) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  return (
    <ExamContext.Provider
      value={{
        exams,
        questions,
        candidates,
        results,
        activeSession,
        registerCandidate,
        startExam,
        selectOption,
        clearResponse,
        toggleReview,
        setCurrentQuestionIndex,
        submitExam,
        addExam,
        updateExam,
        deleteExam,
        addQuestion,
        updateQuestion,
        deleteQuestion,
      }}
    >
      {children}
    </ExamContext.Provider>
  );
}

export function useExam() {
  const context = useContext(ExamContext);
  if (!context) {
    throw new Error('useExam must be used within an ExamProvider');
  }
  return context;
}
