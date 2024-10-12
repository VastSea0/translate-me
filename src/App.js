import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

import Home from "./Pages/Home";
import Settings from "./Pages/Settings";
import About from "./Pages/About";
import LoginPage from "./Pages/Login";
import ProfilePage from "./Pages/Profile";
import PlayGround from "./Pages/PlayGround";
import SwipeMe from "./Pages/PlayGround/SwipeMe";
import ContributePage from "./Pages/Contribute";

// TEST GAMES
//import Game from "./Pages/PlayGround/tests/swipeMeAlg";


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
          <Route path="/contribute" element={<ContributePage />} />
          <Route path="/playground" element={<PlayGround />} />
          <Route path="/playground/1" element={<SwipeMe />} />
          {/*
          Test Routes
          <Route path="/tests/game/swipe" element={<Game />} />
          */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;