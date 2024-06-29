import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Playlist from "./pages/Playlist";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playlist" element={<Playlist />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
