import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { SummaryCard } from './components/SummaryCard';
import { StudentList } from './components/StudentList';
import { OverallStats } from './components/OverallStats';
import { PhaseComparison } from './components/PhaseComparison';
import { WorkoutVideos } from './components/WorkoutVideos';
import { StarIcon, PlusIcon } from './components/icons';
import { students as initialStudents } from './data/mockData';
import { Gender, Student } from './types';
import { calculateTotalScore } from './data/mockData';
import { LoginModal } from './components/LoginModal';
import { AddStudentModal } from './components/AddStudentModal';
import { StudentDetailModal } from './components/StudentDetailModal';


const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [students, setStudents] = useState<Student[]>(initialStudents);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    const handleLogin = (success: boolean) => {
        if (success) {
            setIsLoggedIn(true);
            setShowLoginModal(false);
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    const handleUpdateStudent = (updatedStudent: Student) => {
        setStudents(prevStudents =>
            prevStudents.map(s => (s.id === updatedStudent.id ? updatedStudent : s))
        );
    };
    
    const handleAddStudent = (newStudentData: Omit<Student, 'id'>) => {
        const newStudent: Student = {
            ...newStudentData,
            id: Date.now(), // Simple unique ID
        };
        setStudents(prevStudents => [...prevStudents, newStudent]);
        setShowAddModal(false);
    };


    const summaryData = useMemo(() => {
        const totalStudents = students.length;
        const maleStudents = students.filter(s => s.gender === Gender.Lelaki).length;
        const femaleStudents = students.filter(s => s.gender === Gender.Perempuan).length;
        const totalScoreSum = students.reduce((sum, s) => sum + calculateTotalScore(s.phase1), 0);
        const averageScore = totalStudents > 0 ? (totalScoreSum / totalStudents).toFixed(1) : 0;
        return { totalStudents, maleStudents, femaleStudents, averageScore };
    }, [students]);

    return (
        <div className="min-h-screen bg-brand-light dark:bg-brand-bg-darker font-sans text-brand-text-light dark:text-brand-text-dark">
            <Header 
                isLoggedIn={isLoggedIn}
                onLoginClick={() => setShowLoginModal(true)}
                onLogoutClick={handleLogout}
                theme={theme}
                toggleTheme={toggleTheme}
            />
            
            <main className="p-4 sm:p-6 space-y-6">
                {/* Summary Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <SummaryCard 
                        icon={<span className="text-4xl">👥</span>} 
                        title="Jumlah Murid" 
                        value={summaryData.totalStudents}
                        color="bg-gradient-to-br from-blue-500 to-blue-700"
                        trend="+2 murid baru"
                    />
                    <SummaryCard 
                        icon={<span className="text-4xl">👦</span>} 
                        title="Murid Lelaki" 
                        value={summaryData.maleStudents}
                        color="bg-gradient-to-br from-sky-400 to-sky-600"
                    />
                    <SummaryCard 
                        icon={<span className="text-4xl">👧</span>} 
                        title="Murid Perempuan" 
                        value={summaryData.femaleStudents}
                        color="bg-gradient-to-br from-pink-400 to-pink-600"
                    />
                    <SummaryCard 
                        icon={<StarIcon className="w-8 h-8 text-white"/>} 
                        title="Purata Skor (Fasa 1)" 
                        value={summaryData.averageScore}
                        color="bg-gradient-to-br from-brand-primary-light to-brand-primary-dark"
                        trend="+1.2 mata purata"
                    />
                </div>
                
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <StudentList 
                            students={students} 
                            isLoggedIn={isLoggedIn} 
                            onUpdateStudent={handleUpdateStudent}
                            onStudentSelect={setSelectedStudent}
                        />
                    </div>
                    <div className="space-y-6">
                        <OverallStats students={students} />
                        <PhaseComparison students={students} />
                        <WorkoutVideos />
                    </div>
                </div>

            </main>

            {/* Modals */}
            {showLoginModal && <LoginModal onLogin={handleLogin} onClose={() => setShowLoginModal(false)} />}
            {showAddModal && <AddStudentModal onSave={handleAddStudent} onClose={() => setShowAddModal(false)} />}
            {selectedStudent && <StudentDetailModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />}


            {/* Floating Add Button */}
            {isLoggedIn && (
                <button 
                    onClick={() => setShowAddModal(true)}
                    title="Tambah Data Baharu"
                    className="fixed bottom-6 right-6 bg-gradient-to-br from-green-500 to-green-700 text-white p-4 rounded-full shadow-lg hover:from-green-600 hover:to-green-800 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800">
                    <PlusIcon className="w-8 h-8" />
                </button>
            )}
        </div>
    );
};

export default App;