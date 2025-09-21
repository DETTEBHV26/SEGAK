import React from 'react';

interface SummaryCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color: string;
  trend?: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ icon, title, value, color, trend }) => {
  return (
    <div className="flex items-center p-4 bg-brand-bg-light dark:bg-brand-bg-dark rounded-xl shadow-sm transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg dark:hover:shadow-brand-primary/20">
      <div className={`p-3 rounded-full ${color} shadow-inner`}>
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-brand-text-light dark:text-brand-text-dark">{value}</p>
        {trend && <p className="text-xs text-green-500 mt-1 font-medium">{trend}</p>}
      </div>
    </div>
  );
};
