import React from 'react';

export const Loader = ({ size = 'md', text = 'Loading...' }) => {
  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-16 w-16',
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className={`${sizes[size]} border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin`} />
      {text && <p className="mt-4 text-gray-600 text-sm">{text}</p>}
    </div>
  );
};