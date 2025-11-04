// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {
  getAI,
  getGenerativeModel,
  getLiveGenerativeModel,
  GoogleAIBackend,
  ResponseModality,
} from "firebase/ai";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY!,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN!,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID!,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID!,
  appId: import.meta.env.VITE_FIREBASE_APP_ID!,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID!,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseDb = getFirestore(app);
const ai = getAI(app, { backend: new GoogleAIBackend() });
export const GeminiAiModel = getGenerativeModel(ai, {
  model: "gemini-2.5-flash",
});
// Create a `LiveGenerativeModel` instance with the flash-live model (only model that supports the Live API)
export const GeminiAiLiveModel = getLiveGenerativeModel(ai, {
  model: "gemini-2.0-flash-live-001",
  // Configure the model to respond with text
  generationConfig: {
    responseModalities: [ResponseModality.TEXT],
  },
});
