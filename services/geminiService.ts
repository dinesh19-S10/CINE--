

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

interface FunFactResult {
    fact: string | null;
    error: string | null;
}

export const getMovieFunFact = async (movieTitle: string): Promise<FunFactResult> => {
  try {
    // FIX: Removed redundant API key check as per guidelines.
    const prompt = `Generate a short, fun, and interesting trivia fact about the fictional movie titled "${movieTitle}". Be creative and make something up that sounds plausible for the movie's genre.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    const fact = response.text;
    
    if (fact) {
        return { fact: fact, error: null };
    } else {
        throw new Error("Received an empty response from the AI.");
    }

  } catch (error) {
    console.error("Error fetching fun fact from Gemini API:", error);
    let errorMessage = "Could not fetch a fun fact at the moment. Please try again later.";
    if (error instanceof Error) {
        errorMessage = `An error occurred: ${error.message}`;
    }
    return { fact: null, error: errorMessage };
  }
};
