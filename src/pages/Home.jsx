import React from "react";
import { Link } from "react-router-dom";
import { DefaultButton, OutlineButton } from "../styles/Buttons";

const Home = () => {
  return (
    <div className="flex w-full h-screen bg-green-700 p-50 justify-center align-middle p-10 box-border overflow-y-hidden">
      <div className="flex w-3/6 flex-col gap-y-5 bg-slate-50 rounded-lg drop-shadow-xl divide-y">
        <div className="flex w-full h-56 justify-center align-middle items-center ">
          <h1 className="font-semibold text-stone-600 text-5xl">
            전자심사시스템
          </h1>
        </div>
        <div className="flex w-full">
          <div className="flex w-full h-36 justify-center align-middle items-center gap-x-5 ">
            <Link to="/manager">
              <button
                type="button"
                className={DefaultButton({
                  type: "dark",
                  extra: "w-40 h-14 text-lg",
                })}
              >
                운영스탭
              </button>
            </Link>
            <Link to="referee">
              <button
                type="button"
                className={DefaultButton({
                  type: "red",
                  extra: "w-40 h-14 text-lg",
                })}
              >
                심사위원
              </button>
            </Link>
            <Link to="/display">
              <button
                type="button"
                className={DefaultButton({
                  type: "purple",
                  extra: "w-40 h-14 text-lg",
                })}
              >
                전광판
              </button>
            </Link>
          </div>
        </div>
        <div className="flex">로그인</div>
      </div>
    </div>
  );
};

export default Home;
