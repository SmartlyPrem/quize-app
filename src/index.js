import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import Index from './Context/Index';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJpDV7ImbwNS0bvTNk175HyAwBYUiEDtk",
  authDomain: "firstproject-1bf4e.firebaseapp.com",
  projectId: "firstproject-1bf4e",
  storageBucket: "firstproject-1bf4e.appspot.com",
  messagingSenderId: "278047059193",
  appId: "1:278047059193:web:05d3c46059614f77e84628"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Index>
      <App />
    </Index>
  </React.StrictMode>
);
