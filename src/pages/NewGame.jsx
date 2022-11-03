import React, { useState } from "react";
import { AddDoc } from "../firebases/AddDoc";
import { DefaultButton } from "../styles/Buttons";
import { SpanTitle } from "../styles/Common";

const NewGame = () => {
  const [basicInputs, setBasicInputs] = useState({});

  const handleInputs = (e) => {
    setBasicInputs({
      ...basicInputs,
      [e.target.name]: e.target.value,
    });
    //console.log(basicInputs);
  };

  const handleSave = () => {
    console.log(basicInputs);
    AddDoc({
      documentName: "games",
      collectionName: basicInputs.cupTitle + basicInputs.cupCount,
      datas: { ...basicInputs, cupState: "준비중" },
    });
  };
  const inputList = [
    { title: "대회명", name: "cupTitle" },
    { title: "회차", name: "cupCount" },
    { title: "주최기관", name: "cupOrg" },
    { title: "경기장소", name: "cupLocation" },
    { title: "경기일자", name: "cupDate" },
  ];
  const BasicInput = (input) => (
    <div className={"flex w-2/3 bg-slate-50"}>
      <div className="flex w-full h-12 bg-slate-300 items-center">
        <span className="flex w-1/4 h-10 justify-end items-center px-4">
          {input.title}
        </span>
        <div
          className={
            input.style
              ? `flex bg-slate-100 justify-center items-center h-full ${input.style}}`
              : `flex w-3/4 bg-slate-100 justify-center items-center h-full`
          }
        >
          <input
            type="text"
            name={input.name}
            value={basicInputs.name}
            onChange={(e) => {
              handleInputs(e);
            }}
            className="border border-gray-300 bg-transparent outline-none text-neutral-800 text-md font-semibold placeholder:text-white rounded-md w-11/12 h-10 px-2"
          />
        </div>
      </div>
    </div>
  );
  return (
    <div className="flex min-w-full p-10 box-border flex-wrap ">
      <div className="flex flex-col flex-wrap w-full">
        <div className="flex w-full">
          <SpanTitle type="default" title="기본정보" />
        </div>
        <div className="flex py-5 w-full ">
          <div className="flex w-full box-border flex-wrap flex-col gap-y-3">
            {BasicInput({ title: "대회명", name: "cupTitle" })}
            {BasicInput({ title: "회차", name: "cupCount" })}
            {BasicInput({ title: "주최기관", name: "cupOrg" })}
            {BasicInput({ title: "경기장소", name: "cupLocation" })}
            {BasicInput({ title: "주최일자", name: "cupDate" })}
          </div>
        </div>
        <div className="flex w-full justify-end gap-x-5">
          <button
            type="button"
            className={DefaultButton({
              type: "default",
              extra: "text-lg px-10",
            })}
            onClick={() => handleSave()}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewGame;
