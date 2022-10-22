import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { PlayerOrder } from "../Data";

const Referee = () => {
  let newOrderNum;
  const players = PlayerOrder;
  const [currentOrderNum, setCurrentOrderNum] = useState();
  const unsub = onSnapshot(doc(db, "currentOrder", "용인"), (doc) => {
    newOrderNum = { id: doc.id, ...doc.data() };
    setCurrentOrderNum(newOrderNum.orderNum);
  });

  //const count = useSelector((state) => state.playerlist.orderNum);
  return (
    <div className="bg-slate-100 h-screen w-full flex align-top justify-center">
      {currentOrderNum != undefined && (
        <div className="flex p-10 w-full">
          <div className="flex flex-col flex-1 p-10 bg-slate-200 min-w-50 rounded-md justify-start align-middle items-center">
            <div className="flex w-full justify-center align-top">
              <img
                src={`/img/profile/${currentOrderNum}.jpg`}
                alt=""
                className="w-50 rounded-full bg-slate-50"
              />
            </div>
            <div className="flex w-full justify-start mt-10">
              <p className="flex justify-center">
                <span className="font-bold text-3xl">참가번호 : </span>

                <span className="font-bold text-3xl ml-5">
                  {players[currentOrderNum].playNumber}
                </span>
              </p>
            </div>
            <div className="flex w-full justify-start mt-10">
              <p className="flex justify-center">
                <span className="font-bold text-3xl">이름 : </span>

                <span className="font-bold text-3xl ml-5">
                  {players[currentOrderNum].name}
                </span>
              </p>
            </div>
            <div className="flex w-full justify-start mt-10">
              <p className="flex justify-center">
                <span className="font-bold text-3xl">신장 : </span>

                <span className="font-bold text-3xl ml-5">
                  {players[currentOrderNum].tall}
                </span>
              </p>
            </div>
            <div className="flex w-full justify-start mt-10">
              <p className="flex justify-center">
                <span className="font-bold text-3xl">체중 : </span>

                <span className="font-bold text-3xl ml-5">
                  {players[currentOrderNum].weight}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col flex-1"></div>
    </div>
  );
};

export default Referee;
