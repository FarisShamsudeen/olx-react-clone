// src/firebase.ts (or similar)
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Import getAuth

const firebaseConfig = {
  apiKey: "AIzaSyAxfyq2B6UbTWgKF-ZIX7h6XkOue5TZjck",
  authDomain: "olx-react-clone-2025.firebaseapp.com",
  databaseURL: "https://olx-react-clone-2025-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "olx-react-clone-2025",
  storageBucket: "olx-react-clone-2025.firebasestorage.app",
  messagingSenderId: "395796535361",
  appId: "1:395796535361:web:17c98c8e74374de07d8ec0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Export the auth instance

