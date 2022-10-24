import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import Manager from "./pages/Manager";
import Display from "./pages/Display";
import Referee from "./pages/Referee";
import { playerStore } from "./redux/stores";
import { Provider } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Login";

const isLogin = true;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={playerStore}>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isLogin ? <Home /> : <Navigate replace to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/display" element={<Display />} />
        <Route path="/referee" element={<Referee />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
