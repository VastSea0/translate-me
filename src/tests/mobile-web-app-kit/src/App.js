import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

import Home from "./Pages/Home";
import Settings from "./Pages/Settings";
import About from "./Pages/About";
import LoginPage from "./Pages/Login";
import ProfilePage from "./Pages/Profile";

import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className={`pages ${menuOpen ? 'hidden' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;