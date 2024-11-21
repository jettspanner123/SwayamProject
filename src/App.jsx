import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import RapidFire from "./pages/RapidFire";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/rapid_fire" element={<RapidFire />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
