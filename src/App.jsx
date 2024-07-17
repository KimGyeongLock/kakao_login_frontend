import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import AuthProfile from './AuthProfile';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/callback" element={<AuthProfile />} />
                <Route path="/profile" element={<AuthProfile />} />
            </Routes>
        </Router>
    );
}

export default App;
