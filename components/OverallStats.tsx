import React from 'react';
import { Student } from '../types';
import { calculateTotalScore, getFitnessLevel } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface OverallStatsProps {
  students: Student[];
}

export const OverallStats: React.FC<OverallStatsProps> = ({ students }) => {
  if (students.length === 0) {
    return (
        <div className="p-6 bg-brand-bg-light dark:bg-brand-bg-dark rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-brand-text-light dark:text-brand-text-dark mb-4">Statistik Keseluruhan</h2>
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">Tiada data untuk dipaparkan.</p>
        </div>
    )
  }

  // --- Simplified Calculations for Phase 1 ---

  const totalScoreSum = students.reduce((sum, s) => sum + calculateTotalScore(s.phase1), 0);
  const averageScore = (totalScoreSum / students.length).toFixed(1);

  const bestPerformer = students.reduce((prev, current) => 
    (calculateTotalScore(prev.phase1) > calculateTotalScore(current.phase1)) ? prev : current
  );
  
  const worstPerformer = students.reduce((prev, current) => 
    (calculateTotalScore(prev.phase1) < calculateTotalScore(current.phase1)) ? prev : current
  );
  
  const bestScore = calculateTotalScore(bestPerformer.phase1);
  const worstScore = calculateTotalScore(worstPerformer.phase1);

  // Fitness Level Distribution
  const levelCounts = students.reduce((acc, student) => {
    const { level } = getFitnessLevel(calculateTotalScore(student.phase1));
    acc[level] = (acc[level] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const levelChartData = [
    { name: 'Cemerlang', murid: levelCounts['Cemerlang'] || 0, fill: '#3B82F6' },
    { name: 'Sangat Baik', murid: levelCounts['Sangat Baik'] || 0, fill: '#10B981' },
    { name: 'Baik', murid: levelCounts['Baik'] || 0, fill: '#F59E0B' },
    { name: 'Kurang Cergas', murid: levelCounts['Kurang Cergas'] || 0, fill: '#F97316' },
    { name: 'Tidak Cergas', murid: levelCounts['Tidak Cergas'] || 0, fill: '#EF4444' },
  ];
  
  const shortenName = (name: string) => {
      const parts = name.split(' ');
      if (parts.length > 2) {
          return `${parts[0]} ${parts[1].charAt(0)}.`;
      }
      return name;
  }

  return (
    <div className="space-y-6">
        <div className="p-6 bg-brand-bg-light dark:bg-brand-bg-dark rounded-xl shadow-sm">
            <h3 className="text-lg font-bold text-brand-text-light dark:text-brand-text-dark mb-4">Ringkasan Prestasi (Fasa 1)</h3>
            <ul className="space-y-3 text-sm">
                <li className="flex justify-between items-center p-2 bg-gray-50 dark:bg-brand-dark-light rounded-md">
                    <span className="text-gray-600 dark:text-gray-300">Purata Skor Keseluruhan</span>
                    <span className="font-bold text-brand-text-light dark:text-brand-text-dark">{averageScore}</span>
                </li>
                <li className="flex justify-between items-center p-2 bg-gray-50 dark:bg-brand-dark-light rounded-md">
                    <span className="text-gray-600 dark:text-gray-300">Skor Tertinggi</span>
                    <div className="text-right">
                        <span className="font-bold text-green-500">{bestScore}</span>
                        <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">({shortenName(bestPerformer.name)})</span>
                    </div>
                </li>
                 <li className="flex justify-between items-center p-2 bg-gray-50 dark:bg-brand-dark-light rounded-md">
                    <span className="text-gray-600 dark:text-gray-300">Skor Terendah</span>
                    <div className="text-right">
                        <span className="font-bold text-red-500">{worstScore}</span>
                         <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">({shortenName(worstPerformer.name)})</span>
                    </div>
                </li>
            </ul>
        </div>
        
        <div className="p-6 bg-brand-bg-light dark:bg-brand-bg-dark rounded-xl shadow-sm">
             <h3 className="text-lg font-bold text-brand-text-light dark:text-brand-text-dark mb-4">Taburan Tahap Kecergasan (Fasa 1)</h3>
             <div className="h-72 w-full">
                <ResponsiveContainer>
                  <BarChart data={levelChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                    <XAxis dataKey="name" fontSize={12} tick={{ fill: 'currentColor' }} />
                    <YAxis tick={{ fill: 'currentColor' }} />
                    <Tooltip 
                        cursor={{fill: 'rgba(128, 128, 128, 0.1)'}}
                        contentStyle={{ 
                            backgroundColor: 'rgba(30, 41, 59, 0.9)', 
                            color: '#E2E8F0',
                            borderRadius: '0.5rem',
                            border: '1px solid #334155'
                        }} 
                    />
                    <Bar dataKey="murid" name="Jumlah Murid" isAnimationActive={true} animationDuration={800} />
                  </BarChart>
                </ResponsiveContainer>
             </div>
        </div>
    </div>
  );
};
