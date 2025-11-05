import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  // Fix: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
  icon?: React.ReactElement;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, icon, className = '' }) => {
  return (
    <div className={`bg-gray-800 border border-gray-700 rounded-lg shadow-md p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
        {icon && <div className="text-teal-400">{icon}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Card;