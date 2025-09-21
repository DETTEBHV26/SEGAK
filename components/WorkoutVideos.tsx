import React from 'react';

const categories = [
    { name: 'Pemanasan', icon: '🔥', query: 'kids+warm+up+exercise' },
    { name: 'Larian', icon: '🏃', query: 'kids+running+drills' },
    { name: 'Sit-up', icon: '💪', query: 'kids+sit+up+exercise' },
    { name: 'Tekan Tubi', icon: '🏋️', query: 'kids+push+up+exercise' },
    { name: 'Kelenturan', icon: '🧘', query: 'kids+flexibility+stretches' },
    { name: 'Penyejukan', icon: '🧊', query: 'kids+cool+down+exercise' },
];

export const WorkoutVideos: React.FC = () => {
    return (
        <div className="p-6 bg-brand-bg-light dark:bg-brand-bg-dark rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-brand-text-light dark:text-brand-text-dark mb-4">Menu Video Senaman</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map(category => (
                    <a
                        key={category.name}
                        href={`https://www.youtube.com/results?search_query=${category.query}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center p-4 text-center bg-gray-50 dark:bg-brand-dark-light rounded-lg hover:bg-brand-primary hover:text-white transition-all duration-300 group transform hover:-translate-y-1"
                    >
                        <span className="text-4xl mb-2 transition-transform duration-300 group-hover:scale-125">{category.icon}</span>
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 group-hover:text-white">{category.name}</span>
                    </a>
                ))}
            </div>
        </div>
    );
};