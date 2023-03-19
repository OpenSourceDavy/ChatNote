import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import reportWebVitals from './reportWebVitals';
import LoginPage from "./pages/loginlayer";
import SignupPage from "./pages/signuplayer"
import MainPage from "./pages/mainPage";

export default function Dchat() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<LoginPage/>}/>
                <Route path="signup" element={<SignupPage/>}/>
                <Route path="userLayout" element={<MainPage/>}/>

            </Routes>
        </BrowserRouter>
    );
}




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Dchat/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
