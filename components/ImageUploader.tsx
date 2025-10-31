import React, { useState, useRef } from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { UploadCloudIcon, GenerateIcon } from './icons';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  onGenerate: () => void;
  error: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, onGenerate, error }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
       onImageUpload(file);
       const reader = new FileReader();
       reader.onloadend = () => {
        setImagePreview(reader.result as string);
       };
       reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-2xl text-center">
      <h2 className="text-3xl font-bold text-green-600 mb-2">{t.uploadTitle}</h2>
      <p className="text-earth-500 mb-8">{t.uploadSubtitle}</p>
      
      <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-dashed border-earth-200 hover:border-green-400 transition-colors">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
        />
        {!imagePreview ? (
            <label 
                className="flex flex-col items-center justify-center cursor-pointer h-64"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={triggerFileInput}
            >
                <UploadCloudIcon className="w-16 h-16 text-green-400 mb-4" />
                <span className="font-semibold text-green-600">{t.uploadPrompt}</span>
                <span className="text-sm text-earth-500 mt-1">{t.uploadFormats}</span>
            </label>
        ) : (
          <div className="relative group">
            <img src={imagePreview} alt="Ingredients preview" className="w-full h-auto max-h-80 object-contain rounded-lg" />
            <div 
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg cursor-pointer"
              onClick={triggerFileInput}
            >
              <span className="text-white text-lg font-semibold">{t.changeImage}</span>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-accent/10 border border-accent text-accent px-4 py-3 rounded-lg relative mt-6" role="alert">
          <strong className="font-bold">{t.error_oops} </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <button
        onClick={onGenerate}
        disabled={!imagePreview}
        className="mt-8 w-full flex items-center justify-center gap-3 bg-green-600 text-white font-bold py-4 px-6 rounded-lg shadow-md hover:bg-green-400 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105"
      >
        <GenerateIcon className="w-6 h-6" />
        {t.generate}
      </button>
    </div>
  );
};

export default ImageUploader;