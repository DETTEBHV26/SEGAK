import React from 'react';
import { RocketLaunchIcon, DocumentArrowDownIcon, PrinterIcon } from './icons';

export const QuickActions: React.FC = () => {
    
    const handleActionClick = (action: string) => {
        alert(`${action} feature is not yet implemented.`);
    };
    
    return (
        <div className="p-4 bg-gray-50 dark:bg-brand-dark-light rounded-lg mb-4">
            <h3 className="text-md font-semibold text-brand-text-light dark:text-brand-text-dark mb-3">Tindakan Pantas</h3>
            <div className="flex flex-wrap gap-3">
                 <button 
                    onClick={() => handleActionClick('Analysis')}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-transform transform hover:scale-105"
                >
                    <RocketLaunchIcon className="w-4 h-4" />
                    Analisis
                </button>
                <button 
                    onClick={() => handleActionClick('Download Report')}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-transform transform hover:scale-105"
                >
                    <DocumentArrowDownIcon className="w-4 h-4" />
                    Muat Turun Laporan
                </button>
                <button 
                    onClick={() => handleActionClick('Print')}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-lg shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-transform transform hover:scale-105"
                >
                    <PrinterIcon className="w-4 h-4" />
                    Cetak
                </button>
            </div>
        </div>
    );
};
