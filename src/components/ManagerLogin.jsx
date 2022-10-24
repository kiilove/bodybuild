import React, { useEffect, useState } from "react";
import { Login } from "../firebases/Auth";
import { DefaultButton } from "../styles/Buttons";

const ManagerLogin = () => {
  const [inputs, setIputs] = useState({ email: "", password: "" });

  const handleInputs = (e) => {
    setIputs({ ...inputs, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log(inputs);
  }, [inputs]);

  return (
    <div className="flex w-full h-full justify-center align-middle items-center flex-col gap-y-5 p-10">
      <div className="flex w-1/2 h-10">
        <input
          type="text"
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          name="email"
          placeholder="이메일"
          value={inputs.email}
          onChange={(e) => {
            handleInputs(e);
          }}
        />
      </div>
      <div className="flex w-1/2 h-10">
        <input
          type="password"
          name="password"
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          placeholder="•••••••••"
          value={inputs.password}
          required
          onChange={(e) => {
            handleInputs(e);
          }}
        />
      </div>
      <div className="flex w-full h-15 justify-center">
        <button
          className={DefaultButton({ type: "default", extra: "w-1/2" })}
          onClick={() => {
            Login(inputs);
          }}
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default ManagerLogin;
