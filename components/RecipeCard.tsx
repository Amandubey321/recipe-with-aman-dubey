import React from 'react';
import { Recipe } from '../types';
import { useTranslations } from '../hooks/useTranslations';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const t = useTranslations();

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-earth-200 w-full">
      <div className="p-6">
        <h3 className="text-2xl font-bold text-green-700 mb-3">{recipe.recipeName}</h3>
        
        <div className="mb-4">
          <h4 className="text-lg font-semibold text-earth-700 mb-2 border-b pb-1">{t.ingredients}</h4>
          <ul className="list-disc list-inside text-earth-600 space-y-1">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h4 className="text-lg font-semibold text-earth-700 mb-2 border-b pb-1">{t.instructions}</h4>
          <ol className="list-decimal list-inside text-earth-600 space-y-2">
            {recipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
        
        {recipe.notes && (
           <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
             <h4 className="text-md font-semibold text-green-800 mb-1">{t.notes}</h4>
             <p className="text-sm text-green-700">{recipe.notes}</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;