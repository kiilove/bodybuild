import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlayerOrder } from "../Data";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from "../redux/counterSlice";
import { DefaultButton } from "../styles/Buttons";

const Manager = () => {
  const players = PlayerOrder;
  const count = useSelector((state) => state.player.value);
  console.log(count);
  const dispatch = useDispatch();

  const [currentOrderNumber, setCurrentOrderNumber] = useState(0);
  const handleOrderNumber = (props) => {
    switch (props.action) {
      case "next":
        currentOrderNumber < players.length - 1 &&
          setCurrentOrderNumber(currentOrderNumber + 1);
        break;
      case "prev":
        currentOrderNumber > 0 && setCurrentOrderNumber(currentOrderNumber - 1);
        break;
    }
    console.log(currentOrderNumber);
  };
  return (
    <div className="bg-slate-100 h-screen w-full flex align-top justify-center">
      <div className="flex flex-col w-full p-10 gap-y-5">
        <div className="flex flex-col gap-y-10">
          <h1 className="text-2xl font-medium">심판 화면 컨트롤</h1>
          <div className="flex">
            <span>현재 심사 선수 :</span>
            <span>{players[count].name}</span>
          </div>
          <div className="flex">
            <button
              type="button"
              className={DefaultButton({ type: "default" })}
              onClick={() => dispatch(decrement())}
            >
              이전선수
            </button>
            <button
              type="button"
              className={DefaultButton({ type: "default" })}
              onClick={() => dispatch(increment())}
            >
              다음선수
            </button>
          </div>
        </div>
        <div className="flex ">
          <h1 className="text-2xl font-medium">디스플레이 컨트롤</h1>
        </div>
      </div>
    </div>
  );
};

export default Manager;
