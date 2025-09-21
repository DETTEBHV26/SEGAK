import React, { useState } from 'react';
import { Student, ClassLevel, Gender } from '../types';
import { calculateTotalScore, getFitnessLevel } from '../data/mockData';
import { EditStudentModal } from './EditStudentModal';
import { QuickActions } from './QuickActions';

interface StudentListProps {
  students: Student[];
  isLoggedIn: boolean;
  onUpdateStudent: (student: Student) => void;
  onStudentSelect: (student: Student) => void;
}

export const StudentList: React.FC<StudentListProps> = ({ students, isLoggedIn, onUpdateStudent, onStudentSelect }) => {
  const [selectedClass, setSelectedClass] = useState<ClassLevel | 'Semua'>('Semua');
  const [genderFilter, setGenderFilter] = useState<Gender | 'Semua'>('Semua');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const filteredStudents = students
    .filter(student => selectedClass === 'Semua' || student.class === selectedClass)
    .filter(student => genderFilter === 'Semua' || student.gender === genderFilter)
    .filter(student => student.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSaveStudent = (updatedStudent: Student) => {
    onUpdateStudent(updatedStudent);
    setEditingStudent(null);
  };
  
  const getStatusIcon = (level: string): string => {
      if (level === 'Cemerlang' || level === 'Sangat Baik') return '👍';
      if (level === 'Baik') return '🔄';
      return '⚠️';
  }

  return (
    <div className="p-6 bg-brand-bg-light dark:bg-brand-bg-dark rounded-xl shadow-sm">
      <h2 className="text-xl font-bold text-brand-text-light dark:text-brand-text-dark mb-4">Senarai Murid</h2>
      
      {isLoggedIn && <QuickActions />}
      
      <div className="flex flex-col sm:flex-row gap-4 my-4">
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value as ClassLevel | 'Semua')}
          className="w-full sm:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary bg-transparent dark:text-brand-text-dark"
        >
          <option value="Semua">Semua Kelas</option>
          {Object.values(ClassLevel).map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
        <select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value as Gender | 'Semua')}
          className="w-full sm:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary bg-transparent dark:text-brand-text-dark"
        >
          <option value="Semua">Semua Jantina</option>
          {Object.values(Gender).map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Cari nama murid..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary bg-transparent dark:text-brand-text-dark"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-brand-dark-light dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Nama</th>
              <th scope="col" className="px-6 py-3">Tahun</th>
              <th scope="col" className="px-6 py-3 hidden sm:table-cell">Umur</th>
              <th scope="col" className="px-6 py-3 hidden md:table-cell">Jantina</th>
              <th scope="col" className="px-6 py-3 hidden lg:table-cell">No. KP</th>
              <th scope="col" className="px-6 py-3">Skor (Fasa 1)</th>
              <th scope="col" className="px-6 py-3">Tahap</th>
              {isLoggedIn && <th scope="col" className="px-6 py-3 text-center">Tindakan</th>}
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? filteredStudents.map(student => {
              const totalScore = calculateTotalScore(student.phase1);
              const { level, color } = getFitnessLevel(totalScore);
              return (
                <tr key={student.id} className="bg-brand-bg-light dark:bg-brand-bg-dark border-b dark:border-brand-dark-light hover:bg-gray-50 dark:hover:bg-brand-dark-light/50">
                  <td className="px-6 py-4 text-xl" title={level}>{getStatusIcon(level)}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    <button 
                        onClick={() => onStudentSelect(student)}
                        className="text-left hover:underline text-brand-primary-dark dark:text-brand-primary-light"
                    >
                        {student.name}
                    </button>
                  </td>
                  <td className="px-6 py-4">{student.class}</td>
                  <td className="px-6 py-4 hidden sm:table-cell">{student.age}</td>
                  <td className="px-6 py-4 hidden md:table-cell">{student.gender}</td>
                  <td className="px-6 py-4 hidden lg:table-cell">{student.icNumber}</td>
                  <td className="px-6 py-4 font-semibold">{totalScore}</td>
                  <td className={`px-6 py-4 font-semibold ${color}`}>{level}</td>
                  {isLoggedIn && (
                    <td className="px-6 py-4 text-center">
                        <button
                        onClick={() => setEditingStudent(student)}
                        className="font-medium text-brand-primary-dark dark:text-brand-primary-light hover:underline"
                        >
                        Edit
                        </button>
                    </td>
                  )}
                </tr>
              );
            }) : (
                <tr>
                    <td colSpan={isLoggedIn ? 9 : 8} className="text-center py-10 text-gray-500 dark:text-gray-400">
                        Tiada data murid. Sila log masuk sebagai admin untuk menambah data.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
      {isLoggedIn && editingStudent && (
        <EditStudentModal 
            student={editingStudent}
            onSave={handleSaveStudent}
            onClose={() => setEditingStudent(null)}
        />
      )}
    </div>
  );
};
