import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Manager from "./pages/Manager";
import Display from "./pages/Display";
import Referee from "./pages/Referee";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Provider, useSelector } from "react-redux";
import { playerStore } from "./redux/stores";
import Main from "./pages/Main";

function App() {
  const loginUser = useSelector((state) => state.loginAction.email);
  console.log(loginUser);
  const isLogin = true;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
