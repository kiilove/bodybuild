import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import reverse from "../img/logo/reverse.png";
import { DefaultButton } from "../styles/Buttons";

const Login = () => {
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
                className="border-0 bg-transparent outline-none text-white text-sm font-semibold placeholder:text-white w-full ml-2"
                placeholder="이메일"
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
                className="border-0 bg-transparent outline-none text-white text-sm font-semibold placeholder:text-white w-full ml-2"
                placeholder="•••••••••"
              />
            </div>
          </div>
          <div className="flex w-full justify-center align-middle items-center">
            <div className="flex w-1/3">
              <button
                className={DefaultButton({ type: "red", extra: "w-full mr-0" })}
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
