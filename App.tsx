import React, { useState, useContext } from 'react';
import ImageUploader from './components/ImageUploader';
import LoadingSpinner from './components/LoadingSpinner';
import RecipeCard from './components/RecipeCard';
import { generateRecipesFromImage } from './services/geminiService';
import { Recipe } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ChefLogoIcon } from './components/icons';
import { LanguageContext } from './contexts/LanguageContext';
import { useTranslations } from './hooks/useTranslations';

function App() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [recipes, setRecipes] = useLocalStorage<Recipe[]>('recipes', []);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const { language, setLanguage } = useContext(LanguageContext);
  const t = useTranslations();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const handleImageUpload = (file: File) => {
    setImageFile(file);
    if (recipes.length > 0) {
      setRecipes([]);
    }
    setError(null);
  };

  const handleGenerate = async () => {
    if (!imageFile) {
      setError(t.error_upload);
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecipes([]);

    try {
      const generatedRecipes = await generateRecipesFromImage(imageFile, language);
      setRecipes(generatedRecipes);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleStartOver = () => {
    setImageFile(null);
    setRecipes([]);
    setError(null);
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (recipes.length > 0) {
      return (
        <div className="w-full max-w-4xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-green-600">{t.recipesTitle}</h2>
            <button 
                onClick={handleStartOver}
                className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-green-400 transition-colors flex items-center gap-2"
            >
                {t.startOver}
            </button>
          </div>
          <div className="grid gap-8">
            {recipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))}
          </div>
        </div>
      );
    }

    return (
        <ImageUploader 
            onImageUpload={handleImageUpload} 
            onGenerate={handleGenerate} 
            error={error}
        />
    );
  };

  return (
    <div className="bg-earth-100 min-h-screen font-sans">
        <header className="absolute top-0 right-0 p-6">
            <button 
                onClick={toggleLanguage}
                className="bg-earth-200 text-earth-700 font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-earth-500 hover:text-white transition-colors"
            >
                {t.languageToggle}
            </button>
        </header>
      <main className="container mx-auto px-4 py-12 flex flex-col items-center">
        <header className="text-center mb-12 flex flex-col items-center">
            <ChefLogoIcon className="w-32 h-32 mb-4 text-earth-700" />
            <h1 className="text-5xl font-bold text-earth-700 mb-2">{t.title} <span className="text-green-600">Aman Dubey</span></h1>
            <p className="text-xl text-earth-500">{t.tagline}</p>
        </header>
        
        {renderContent()}

      </main>
    </div>
  );
}

export default App;