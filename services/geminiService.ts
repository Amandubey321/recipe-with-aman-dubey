import { GoogleGenAI, Type } from "@google/genai";
import { fileToBase64 } from "../utils/fileUtils";
import { Recipe } from "../types";

// FIX: Initialize the GoogleGenAI client. Ensure API_KEY is set in environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const schema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      recipeName: {
        type: Type.STRING,
        description: "The name of the recipe.",
      },
      ingredients: {
        type: Type.ARRAY,
        items: {
          type: Type.STRING,
        },
        description: "A list of ingredients for the recipe, including quantities.",
      },
      instructions: {
        type: Type.ARRAY,
        items: {
          type: Type.STRING,
        },
        description: "The step-by-step instructions to prepare the dish.",
      },
      notes: {
        type: Type.STRING,
        description: "Optional notes or tips for the recipe, like serving suggestions or variations."
      },
    },
    required: ["recipeName", "ingredients", "instructions"],
  },
};

const languageMap: Record<'en' | 'hi', string> = {
  en: 'English',
  hi: 'Hindi'
};

export const generateRecipesFromImage = async (imageFile: File, language: 'en' | 'hi'): Promise<Recipe[]> => {
  const base64Image = await fileToBase64(imageFile);
  
  const imagePart = {
    inlineData: {
      data: base64Image,
      mimeType: imageFile.type,
    },
  };

  const textPart = {
    text: `Analyze the ingredients in this image. Suggest 3 diverse and creative recipes I can make. For each recipe, provide a name, a list of ingredients with quantities, and step-by-step instructions. Also include optional notes or tips for each recipe. IMPORTANT: The entire response, including all keys and values in the JSON, must be in ${languageMap[language]}.`,
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const jsonText = response.text.trim();
    
    if (!jsonText) {
        throw new Error("The AI returned an empty response. This might be due to a content safety filter. Please try a different image.");
    }

    try {
      const recipes = JSON.parse(jsonText);
      return recipes as Recipe[];
    } catch (error) {
      console.error("Error parsing JSON from Gemini response:", error);
      console.error("Raw response text:", jsonText);
      throw new Error("The AI's response was not in the expected format. Please try again.");
    }
  } catch (error: any) {
    console.error("Error calling Gemini API:", error);

    const errorMessage = error.message || '';
    if (errorMessage.includes('API key not valid')) {
      throw new Error("Authentication failed. Please check if the API key is valid and configured correctly.");
    }
    if (errorMessage.includes('429') || errorMessage.toLowerCase().includes('quota')) {
      throw new Error("You've made too many requests recently. Please wait a while and try again.");
    }
    if (errorMessage.includes('Invalid argument')) {
       throw new Error("The image provided might be invalid or corrupted. Please try a different image.");
    }

    // Forward the specific error message if it's one we've already crafted
    if (error instanceof Error && (
        error.message.includes("The AI returned an empty response") || 
        error.message.includes("The AI's response was not in the expected format")
    )) {
        throw error;
    }

    throw new Error("Sorry, something went wrong while communicating with the AI. Please try again later.");
  }
};