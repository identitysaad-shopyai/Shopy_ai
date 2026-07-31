import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY ?? '';

// DIAGNOSTIC: guarded so a missing API key doesn't crash app startup.
// Remove try/catch once EXPO_PUBLIC_GEMINI_API_KEY is configured.
let ai: GoogleGenAI;
try {
  ai = new GoogleGenAI({ apiKey });
} catch {
  ai = null as unknown as GoogleGenAI;
}
export { ai };
