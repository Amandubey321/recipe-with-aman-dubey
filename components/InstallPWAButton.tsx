import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { DownloadIcon } from './icons';

interface InstallPWAButtonProps {
  onClick: () => void;
}

const InstallPWAButton: React.FC<InstallPWAButtonProps> = ({ onClick }) => {
  const t = useTranslations();

  return (
    <button
      onClick={onClick}
      className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-green-400 transition-colors flex items-center gap-2"
    >
      <DownloadIcon className="w-5 h-5" />
      {t.installApp}
    </button>
  );
};

export default InstallPWAButton;