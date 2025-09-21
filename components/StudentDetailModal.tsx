import React from 'react';
import { Student, Gender } from '../types';
import { BoyIcon, GirlIcon } from './icons';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend, Tooltip, ResponsiveContainer } from 'recharts';

interface StudentDetailModalProps {
    student: Student;
    onClose: () => void;
}

const mapSubjectKeyToName = (key: string): string => {
    const map: Record<string, string> = {
        bmi: 'BMI',
        naikTurunBangku: 'Naik Turun Bangku',
        tekanTubi: 'Tekan Tubi',
        ringkukTubi: 'Ringkuk Tubi Separa',
        jangkauanMelunjur: 'Jangkauan Melunjur',
    };
    return map[key] || key;
};


export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({ student, onClose }) => {

    const chartData = Object.keys(student.phase1).map(key => ({
        subject: mapSubjectKeyToName(key),
        phase1: student.phase1[key as keyof typeof student.phase1],
        phase2: student.phase2[key as keyof typeof student.phase2],
        fullMark: 5,
    }));

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" aria-modal="true" role="dialog">
            <div className="bg-brand-bg-light dark:bg-brand-bg-dark rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
                <div className="p-6 sticky top-0 bg-brand-bg-light dark:bg-brand-bg-dark border-b dark:border-brand-dark-light z-10">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            {student.gender === Gender.Lelaki ? <BoyIcon className="w-8 h-8 text-blue-500" /> : <GirlIcon className="w-8 h-8 text-pink-500" />}
                            <div>
                                <h2 className="text-xl font-bold text-brand-text-light dark:text-brand-text-dark">{student.name}</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{student.class}</p>
                            </div>
                        </div>
                        <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div className="p-6 space-y-6 overflow-y-auto flex-grow">
                     {/* Chart */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Perbandingan Skor Fasa 1 & Fasa 2</h3>
                        <div className="h-80 w-full">
                            <ResponsiveContainer>
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                                    <PolarGrid strokeOpacity={0.3} />
                                    <PolarAngleAxis dataKey="subject" fontSize={12} tick={{ fill: 'currentColor' }} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'rgba(30, 41, 59, 0.9)', 
                                            color: '#E2E8F0',
                                            borderRadius: '0.5rem',
                                            border: '1px solid #334155'
                                        }}
                                    />
                                    <Legend />
                                    <Radar name="Fasa 1" dataKey="phase1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                                    <Radar name="Fasa 2" dataKey="phase2" stroke="#F97316" fill="#F97316" fillOpacity={0.6} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                     {/* Personal Details */}
                    <div className="border-t dark:border-brand-dark-light pt-6">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Maklumat Peribadi</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="text-gray-500 dark:text-gray-400">No. KP</div>
                            <div className="font-medium text-brand-text-light dark:text-brand-text-dark">{student.icNumber}</div>
                            <div className="text-gray-500 dark:text-gray-400">Umur</div>
                            <div className="font-medium text-brand-text-light dark:text-brand-text-dark">{student.age}</div>
                             <div className="text-gray-500 dark:text-gray-400">Jantina</div>
                            <div className="font-medium text-brand-text-light dark:text-brand-text-dark">{student.gender}</div>
                        </div>
                    </div>
                </div>

                <div className="p-4 flex justify-end items-center sticky bottom-0 bg-gray-50 dark:bg-brand-bg-dark/80 backdrop-blur-sm border-t dark:border-brand-dark-light">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-white bg-brand-primary border border-transparent rounded-lg shadow-sm hover:bg-brand-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary">
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
};
