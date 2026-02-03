import React from 'react';

export const Alert = ({ type = 'info', message, onClose }) => {
  const styles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  if (!message) return null;

  return (
    <div className={`border rounded-lg p-4 mb-4 flex items-start justify-between ${styles[type]} animate-fade-in`}>
      <div className="flex items-start">
        <span className="text-lg mr-3 mt-0.5">{icons[type]}</span>
        <p className="text-sm font-medium">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-current hover:opacity-70 transition-opacity ml-4"
        >
          ✕
        </button>
      )}
    </div>
  );
};