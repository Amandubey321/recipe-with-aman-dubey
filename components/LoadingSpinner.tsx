import React from 'react';
import { useTranslations } from '../hooks/useTranslations';

const LoadingSpinner: React.FC = () => {
  const t = useTranslations();
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-green-600"></div>
      <p className="text-lg text-green-600 font-semibold">{t.loading}</p>
    </div>
  );
};

export default LoadingSpinner;