import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import reverse from "../img/logo/reverse.png";
import { DefaultButton } from "../styles/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { isLogin } from "../redux/loginSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const [inputs, setIputs] = useState({ email: "", password: "" });
  const [loginEmail, setLoginEmail] = useState("");
  const [loginError, setLoginError] = useState({ status: false });
  const loginUserInfo = useSelector((state) => {
    return { email: state.loginAction.email, group: state.loginAction.group };
  });
  const navigate = useNavigate();

  //console.log(loginUserInfo);
  const handleInputs = (e) => {
    setIputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handelLogin = async () => {
    try {
      const auth = getAuth();
      const { user } = await signInWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password
      );
      const { email } = user;
      setLoginEmail(email);
      dispatch(isLogin({ email: email, group: "isAdmin" }));
      navigate("/manager");
    } catch (error) {
      setLoginError({ status: true, code: error.code, msg: error.message });
      //console.log(loginError);
    }
  };

  return (
    <div className="bg-gradient-to-l from-yellow-600 to-red-600 w-full h-screen flex justify-center align-middle items-center flex-col">
      <div className="flex w-1/2  justify-center align-top item-center flex-col gap-y-10 flex-wrap box-border">
        <div className="flex w-full justify-center align-middle items-center">
          <img src={reverse} alt="Logo" style={{ width: "10%" }} />
        </div>
        <div className="flex w-full justify-center align-middle items-center">
          <p className="text-2xl font-bold text-gray-100">
            스마트 심사 시스템 로그인
          </p>
        </div>
        <div className="flex w-full justify-center align-middle items-center h-28 gap-y-5 flex-col">
          <div className="flex bg-slate-100 divide-x w-1/3 bg-opacity-50 rounded-md ">
            <div className="flex w-16 h-10 justify-center align-middle items-center">
              <FontAwesomeIcon
                icon={faUser}
                style={{
                  fontSize: 20,
                  background: "none",
                  color: "white",
                }}
              />
            </div>
            <div className="flex w-full">
              <input
                type="text"
                name="email"
                className="border-0 bg-transparent outline-none text-white text-sm font-semibold placeholder:text-white w-full ml-2"
                placeholder="이메일"
                value={inputs.email}
                onChange={(e) => {
                  handleInputs(e);
                }}
              />
            </div>
          </div>
          <div className="flex bg-slate-100 divide-x w-1/3 bg-opacity-50 rounded-md ">
            <div className="flex w-16 h-10 justify-center align-middle items-center">
              <FontAwesomeIcon
                icon={faKey}
                style={{
                  fontSize: 20,
                  background: "none",
                  color: "white",
                }}
              />
            </div>
            <div className="flex w-full">
              <input
                type="password"
                name="password"
                className="border-0 bg-transparent outline-none text-white text-sm font-semibold placeholder:text-white w-full ml-2"
                placeholder="•••••••••"
                value={inputs.password}
                onChange={(e) => {
                  handleInputs(e);
                }}
              />
            </div>
          </div>
          <div className="flex w-full justify-center align-middle items-center">
            <div className="flex w-1/3">
              <button
                className={DefaultButton({ type: "red", extra: "w-full mr-0" })}
                onClick={() => {
                  handelLogin();
                }}
              >
                로그인
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
