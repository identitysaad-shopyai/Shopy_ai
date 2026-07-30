import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY!;

export const ai = new GoogleGenAI({
  apiKey,
});