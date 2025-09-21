import React, { useState, useMemo } from 'react';
import { Student, SegakScore } from '../types';
import { calculateTotalScore, getFitnessLevel } from '../data/mockData';

interface PhaseComparisonProps {
  students: Student[];
}

const calculateAverageScores = (students: Student[], phase: 'phase1' | 'phase2'): SegakScore => {
  const totalStudents = students.length;
  if (totalStudents === 0) return { bmi: 0, naikTurunBangku: 0, tekanTubi: 0, ringkukTubi: 0, jangkauanMelunjur: 0 };

  const totalScores = students.reduce((acc, student) => {
    const phaseScores = student[phase];
    acc.bmi += phaseScores.bmi;
    acc.naikTurunBangku += phaseScores.naikTurunBangku;
    acc.tekanTubi += phaseScores.tekanTubi;
    acc.ringkukTubi += phaseScores.ringkukTubi;
    acc.jangkauanMelunjur += phaseScores.jangkauanMelunjur;
    return acc;
  }, { bmi: 0, naikTurunBangku: 0, tekanTubi: 0, ringkukTubi: 0, jangkauanMelunjur: 0 });

  return {
    bmi: parseFloat((totalScores.bmi / totalStudents).toFixed(1)),
    naikTurunBangku: parseFloat((totalScores.naikTurunBangku / totalStudents).toFixed(1)),
    tekanTubi: parseFloat((totalScores.tekanTubi / totalStudents).toFixed(1)),
    ringkukTubi: parseFloat((totalScores.ringkukTubi / totalStudents).toFixed(1)),
    jangkauanMelunjur: parseFloat((totalScores.jangkauanMelunjur / totalStudents).toFixed(1)),
  };
};

const PhaseDataView: React.FC<{ scores: SegakScore }> = ({ scores }) => {
  const totalScore = calculateTotalScore(scores);
  const { level, color } = getFitnessLevel(totalScore);

  const testItems = [
    { name: 'BMI', score: scores.bmi },
    { name: 'Naik Turun Bangku', score: scores.naikTurunBangku },
    { name: 'Tekan Tubi', score: scores.tekanTubi },
    { name: 'Ringkuk Tubi Separa', score: scores.ringkukTubi },
    { name: 'Jangkauan Melunjur', score: scores.jangkauanMelunjur },
  ];

  return (
    <div className="space-y-3">
      <ul className="space-y-2">
        {testItems.map(item => (
          <li key={item.name} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-brand-dark-light rounded-md">
            <span className="text-gray-600 dark:text-gray-300">{item.name}</span>
            <span className="font-bold text-brand-text-light dark:text-brand-text-dark">{item.score}</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-brand-dark rounded-lg mt-4">
        <span className="font-bold text-gray-700 dark:text-gray-200">Jumlah Skor Purata</span>
        <span className="text-lg font-bold text-brand-primary">{totalScore.toFixed(1)}</span>
      </div>
      <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-brand-dark rounded-lg">
        <span className="font-bold text-gray-700 dark:text-gray-200">Tahap Kecergasan Purata</span>
        <span className={`text-lg font-bold ${color}`}>{level}</span>
      </div>
    </div>
  );
};

export const PhaseComparison: React.FC<PhaseComparisonProps> = ({ students }) => {
  const [activeTab, setActiveTab] = useState<'phase1' | 'phase2'>('phase1');

  const avgPhase1 = useMemo(() => calculateAverageScores(students, 'phase1'), [students]);
  const avgPhase2 = useMemo(() => calculateAverageScores(students, 'phase2'), [students]);

  return (
    <div className="p-6 bg-brand-bg-light dark:bg-brand-bg-dark rounded-xl shadow-sm">
      <h2 className="text-xl font-bold text-brand-text-light dark:text-brand-text-dark mb-4">Perbandingan Purata Fasa 1 & 2</h2>
      <div className="mb-4">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('phase1')}
            className={`px-4 py-2 text-sm font-medium -mb-px border-b-2 ${activeTab === 'phase1' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            Fasa 1
          </button>
          <button
            onClick={() => setActiveTab('phase2')}
            className={`px-4 py-2 text-sm font-medium -mb-px border-b-2 ${activeTab === 'phase2' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            Fasa 2
          </button>
        </div>
      </div>
      <div>
        {activeTab === 'phase1' && <PhaseDataView scores={avgPhase1} />}
        {activeTab === 'phase2' && <PhaseDataView scores={avgPhase2} />}
      </div>
    </div>
  );
};