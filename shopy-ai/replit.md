# Shopy AI

An Expo SDK 57 / React Native app for AI-powered shop management, featuring inventory, sales, analytics, scanner, payments, and Gemini AI voice recognition.

## Stack

- Expo SDK 57 + Expo Router (file-based routing)
- React Native + React Native Web (web support)
- Google Gemini AI (`@google/genai`)
- `expo-speech-recognition` for voice input
- TypeScript (strict mode)

## Running the app

```bash
cd shopy-ai
npm install
npx expo start          # interactive (choose web/Android/iOS)
npx expo start --web    # web only
```

## EAS Build (Android APK)

```bash
cd shopy-ai
eas build --profile production-apk --platform android
```

Build profile defined in `eas.json` → `production-apk`.

## Environment / Secrets

- **Gemini API key** — required for AI features; set via `GEMINI_API_KEY` (or however `src/lib/gemini.ts` reads it).

## Project structure

```
shopy-ai/
  src/
    app/          # Expo Router screens (tabs, scanner, payments, …)
    components/   # Shared UI components
    constants/    # theme.ts (colors, fonts, spacing)
    hooks/        # useColorScheme, useTheme
    lib/          # gemini.ts — Gemini AI client
  assets/         # Images, icons
  app.json        # Expo config (EAS projectId: f44049b9-…)
  eas.json        # EAS build profiles
  expo-env.d.ts   # Expo + CSS module type declarations
```

## User preferences

- Senior React Native + Expo + EAS Build engineer perspective
- Do NOT redesign UI, remove features, or change business logic
- Preserve: Dashboard, Navigation, Shop Management, Gemini AI, Voice Recognition
