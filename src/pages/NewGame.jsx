import React, { useState } from "react";

const NewGame = () => {
  const [basicInputs, setBasicInputs] = useState({});

  const handleInputs = (e) => {
    setBasicInputs({
      ...basicInputs,
      [e.target.name]: e.target.value,
    });
  };

  const basicInput = (input) => (
    <div className="flex w-2/3 bg-slate-50">
      <div className="flex w-full h-12 bg-slate-300">
        <span className="flex w-1/4 h-10 justify-end items-center px-4">
          {input.title}
        </span>
        <div className="flex w-3/4 bg-slate-50 justify-center  items-center">
          <input
            type="text"
            name={input.name}
            value={basicInputs.name}
            onChange={(e) => {
              handleInputs(e);
            }}
            className="border border-gray-300 bg-transparent outline-none text-neutral-800 text-md font-semibold placeholder:text-white rounded-md w-11/12 h-10"
          />
        </div>
      </div>
    </div>
  );
  return (
    <div className="flex min-w-full p-10 box-border flex-wrap ">
      <div className="flex flex-col flex-wrap w-full">
        <div className="flex w-full">
          <span>기본정보</span>
        </div>
        <div className="flex py-5 w-full ">
          <div className="flex w-full box-border flex-wrap flex-col gap-y-3">
            {basicInput({ title: "대회명", name: "cupTitle" })}
            {basicInput({ title: "주최기관", name: "cupOrg" })}
            {basicInput({ title: "경기장소", name: "cupLocation" })}
            {basicInput({ title: "주최일자", name: "cupDate" })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewGame;
