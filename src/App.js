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
import NewGame from "./pages/NewGame";
import GameList from "./pages/GameList";
import RefereeManager from "./pages/RefereeManager";

function App() {
  const loginUser = useSelector((state) => state.loginAction.email);
  console.log(loginUser);
  const isLogin = true;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main component={<NewGame />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/newgame" element={<Main component={<NewGame />} />} />
        <Route path="/gamelist" element={<Main component={<GameList />} />} />
        <Route
          path="/refereemanager"
          element={<Main component={<RefereeManager />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
