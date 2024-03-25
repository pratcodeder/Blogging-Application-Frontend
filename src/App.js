

import Header from "./components/Header/";
import Login from "./components/Login/";
import Register from "./components/Register/";
import Home from "./components/Home";

import { Route, Routes } from "react-router-dom";
import * as React from "react";
function App() {
  return (
    <div >
       <Routes>
      

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} /> 

        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
