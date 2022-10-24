import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Manager from "./pages/Manager";
import Display from "./pages/Display";
import Referee from "./pages/Referee";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const isLogin = true;
  return (
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
  );
}

export default App;
