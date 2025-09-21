import React, { useState } from 'react';
import { Student, Gender, ClassLevel, SegakScore } from '../types';

interface AddStudentModalProps {
    onSave: (student: Omit<Student, 'id'>) => void;
    onClose: () => void;
}

const initialScores: SegakScore = { bmi: 1, naikTurunBangku: 1, tekanTubi: 1, ringkukTubi: 1, jangkauanMelunjur: 1 };

const initialState: Omit<Student, 'id'> = {
    name: '',
    age: 10,
    gender: Gender.Lelaki,
    icNumber: '',
    class: ClassLevel.T4,
    phase1: { ...initialScores },
    phase2: { ...initialScores },
};

const ScoreInput: React.FC<{ label: string; value: number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <input
            type="number"
            value={value}
            onChange={onChange}
            min="1"
            max="5"
            className="mt-1 block w-full px-3 py-2 bg-brand-bg-light dark:bg-brand-dark border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
        />
    </div>
);

export const AddStudentModal: React.FC<AddStudentModalProps> = ({ onSave, onClose }) => {
    const [formData, setFormData] = useState(initialState);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'age' ? parseInt(value) : value }));
    };

    const handleScoreChange = (phase: 'phase1' | 'phase2', field: keyof SegakScore, value: string) => {
        const numericValue = parseInt(value, 10);
        if (isNaN(numericValue) || numericValue < 1 || numericValue > 5) return;
        setFormData(prev => ({
            ...prev,
            [phase]: {
                ...prev[phase],
                [field]: numericValue,
            },
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" aria-modal="true" role="dialog">
            <div className="bg-brand-bg-light dark:bg-brand-bg-dark rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
                <form onSubmit={handleSubmit} className="flex flex-col h-full">
                    <div className="p-6 sticky top-0 bg-brand-bg-light dark:bg-brand-bg-dark border-b dark:border-brand-dark-light z-10">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-brand-text-light dark:text-brand-text-dark">Tambah Data Murid Baharu</h2>
                            <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <div className="p-6 space-y-6 overflow-y-auto flex-grow">
                        {/* Personal Details */}
                        <div className="border-b dark:border-brand-dark-light pb-6">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Maklumat Peribadi</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama</label>
                                    <input required type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-brand-bg-light dark:bg-brand-dark border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm" />
                                </div>
                                <div>
                                    <label htmlFor="icNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">No. KP</label>
                                    <input required type="text" name="icNumber" id="icNumber" value={formData.icNumber} onChange={handleInputChange} placeholder="e.g., 140101-12-5511" className="mt-1 block w-full px-3 py-2 bg-brand-bg-light dark:bg-brand-dark border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm" />
                                </div>
                                <div>
                                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Umur</label>
                                    <input required type="number" name="age" id="age" value={formData.age} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-brand-bg-light dark:bg-brand-dark border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm" />
                                </div>
                                <div>
                                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Jantina</label>
                                    <select name="gender" id="gender" value={formData.gender} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-brand-bg-light dark:bg-brand-dark border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm">
                                        {Object.values(Gender).map(g => <option key={g} value={g}>{g}</option>)}
                                    </select>
                                </div>
                                 <div>
                                    <label htmlFor="class" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Kelas</label>
                                    <select name="class" id="class" value={formData.class} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-brand-bg-light dark:bg-brand-dark border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm">
                                        {Object.values(ClassLevel).map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Scores */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Skor Fasa 1</h3>
                                <div className="space-y-3">
                                    {Object.keys(formData.phase1).map(key => (
                                        <ScoreInput key={`p1-${key}`} label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} value={formData.phase1[key as keyof SegakScore]} onChange={(e) => handleScoreChange('phase1', key as keyof SegakScore, e.target.value)} />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Skor Fasa 2</h3>
                                 <div className="space-y-3">
                                    {Object.keys(formData.phase2).map(key => (
                                        <ScoreInput key={`p2-${key}`} label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} value={formData.phase2[key as keyof SegakScore]} onChange={(e) => handleScoreChange('phase2', key as keyof SegakScore, e.target.value)} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-6 flex justify-end items-center space-x-3 sticky bottom-0 bg-gray-50 dark:bg-brand-bg-dark/80 backdrop-blur-sm border-t dark:border-brand-dark-light">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary dark:bg-brand-dark-light dark:text-gray-200 dark:border-gray-600 dark:hover:bg-brand-dark">
                            Batal
                        </button>
                        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                            Tambah Murid
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};