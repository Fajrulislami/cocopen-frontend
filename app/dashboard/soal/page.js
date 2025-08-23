'use client';

import { useState, useEffect } from 'react';

import { FadeIn, SlideUp } from '@/components/Animations';

// Komponen Animasi (jika belum ada, bisa dihapus atau sesuaikan)
// Tapi asumsi kamu sudah punya FadeIn dan SlideUp

export default function SoalPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulasi login
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(3600); // 60 menit dalam detik
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Data soal — nanti akan diambil dari API
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "Apa ibu kota Indonesia?",
      options: ["Bandung", "Surabaya", "Jakarta", "Medan"],
      correctAnswer: 2,
    },
    {
      id: 2,
      question: "Berapa hasil dari 8 + 7?",
      options: ["14", "15", "16", "17"],
      correctAnswer: 1,
    },
    {
      id: 3,
      question: "Siapa penemu bola lampu?",
      options: ["Nikola Tesla", "Thomas Edison", "Albert Einstein", "Marie Curie"],
      correctAnswer: 1,
    },
    {
      id: 4,
      question: "Apa singkatan dari HTML?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Home Tool Markup Language",
        "Hyper Transfer Markup Language"
      ],
      correctAnswer: 0,
    },
    {
      id: 5,
      question: "Apa warna bendera Indonesia?",
      options: ["Merah-Biru", "Biru-Kuning", "Hijau-Merah", "Merah-Putih"],
      correctAnswer: 3,
    },
  ]);

  // Timer
  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId, answerIndex) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: answerIndex,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Akses Ditolak</h2>
          <p className="text-gray-600">Anda harus masuk untuk mengerjakan soal.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <main className="relative overflow-hidden py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <FadeIn>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-800 via-sky-600 to-blue-900 bg-clip-text text-transparent leading-tight tracking-tight">
              Ujian Pilihan Ganda
            </h1>
            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Jawab semua soal dengan cermat. Waktu terbatas: {formatTime(timeLeft)}
            </p>
          </FadeIn>

          {/* Timer Progress */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-sky-200">
              <span className="text-lg font-semibold text-blue-800">⏰ {formatTime(timeLeft)}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Kolom Kiri: Navigasi Soal */}
            <div className="lg:col-span-1">
              <SlideUp delay={200}>
                <div className="bg-white/90 p-6 rounded-3xl shadow-xl border border-white/50 backdrop-blur-sm sticky top-24">
                  <h3 className="font-bold text-blue-900 mb-4">Navigasi Soal</h3>
                  <div className="grid grid-cols-5 gap-2 max-h-60 overflow-y-auto pr-2">
                    {questions.map((q, index) => {
                      const isAnswered = userAnswers[q.id] !== undefined;
                      const isCurrent = index === currentQuestionIndex;
                      return (
                        <button
                          key={q.id}
                          onClick={() => setCurrentQuestionIndex(index)}
                          className={`w-full h-10 text-sm font-medium rounded-lg transition-all duration-200 ${
                            isCurrent
                              ? 'bg-blue-600 text-white shadow-md'
                              : isAnswered
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {index + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </SlideUp>
            </div>

            {/* Kolom Kanan: Soal & Pilihan */}
            <div className="lg:col-span-3">
              <SlideUp delay={300}>
                <div className="bg-gradient-to-br from-white/90 to-sky-50/90 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 backdrop-blur-sm">
                  {!isSubmitted ? (
                    <>
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-sm font-medium text-blue-600">
                          Soal {currentQuestionIndex + 1} dari {questions.length}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            userAnswers[currentQuestion?.id] !== undefined
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {userAnswers[currentQuestion?.id] !== undefined ? 'Terjawab' : 'Belum'}
                        </span>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-8 leading-relaxed">
                        {currentQuestion?.question}
                      </h2>

                      <div className="space-y-4 mb-8">
                        {currentQuestion?.options.map((option, idx) => (
                          <label
                            key={idx}
                            className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                              userAnswers[currentQuestion.id] === idx
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-sky-300 hover:bg-sky-50'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`question-${currentQuestion.id}`}
                              value={idx}
                              checked={userAnswers[currentQuestion.id] === idx}
                              onChange={() => handleAnswerChange(currentQuestion.id, idx)}
                              className="sr-only"
                            />
                            <span
                              className={`inline-flex items-center justify-center w-6 h-6 mr-4 rounded-full border-2 ${
                                userAnswers[currentQuestion.id] === idx
                                  ? 'border-blue-600 bg-blue-600'
                                  : 'border-gray-400'
                              }`}
                            >
                              {userAnswers[currentQuestion.id] === idx && (
                                <span className="w-2.5 h-2.5 bg-white rounded-full"></span>
                              )}
                            </span>
                            <span className="text-gray-800">{option}</span>
                          </label>
                        ))}
                      </div>

                      <div className="flex justify-between">
                        <button
                          onClick={handlePrev}
                          disabled={currentQuestionIndex === 0}
                          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                          Sebelumnya
                        </button>
                        {currentQuestionIndex === questions.length - 1 ? (
                          <button
                            onClick={handleSubmit}
                            className="px-6 py-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-full hover:from-sky-600 hover:to-blue-700 transition-all shadow"
                          >
                            Kumpulkan
                          </button>
                        ) : (
                          <button
                            onClick={handleNext}
                            className="px-6 py-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-full hover:from-sky-600 hover:to-blue-700 transition-all shadow"
                          >
                            Selanjutnya
                          </button>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-3xl">✅</span>
                      </div>
                      <h2 className="text-2xl font-bold text-green-700">Soal Berhasil Dikumpulkan!</h2>
                      <p className="text-gray-600 mt-2">Terima kasih telah menyelesaikan ujian.</p>
                    </div>
                  )}
                </div>
              </SlideUp>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}