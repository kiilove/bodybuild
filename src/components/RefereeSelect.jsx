import { collection, getDocs } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../firebase";
import { OutlineButton } from "../styles/Buttons";
function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}
const RefereeSelect = () => {
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([0, 1, 2, 3]);
  const [right, setRight] = useState([4, 5, 6, 7]);
  const [resData, setResData] = useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
    console.log(right);
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
    console.log(left);
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const getList = async (props) => {
    let dataArray = [];
    try {
      const resDoc = await getDocs(collection(db, props.documentName));
      resDoc.forEach((doc) => {
        dataArray.push({ id: doc.id, ...doc.data() });
      });
    } catch (error) {
      console.log(error);
    } finally {
      setResData(dataArray);
      console.log(dataArray);
    }
  };

  useEffect(() => {
    getList({ documentName: "referee" }).then(console.log(resData));
    //console.log(resData);
  }, []);

  useEffect(() => {
    console.log(checked);
  }, [checked]);

  const customList = (items) => {
    //console.log(items[0]);
    return (
      <div className="flex w-full h-64 overflow-auto">
        <div className="flex flex-col gap-y-2 w-full p-1">
          {items.map((value, idx) => (
            <div
              className={`flex h-13 w-full p-3 justify-center items-center border border-gray-300 rounded-md  ${
                checked.indexOf(value.basicInfo.refId) !== -1 &&
                " border-sky-600 "
              }`}
            >
              <div className="flex items-center h-5 justify-center ">
                <input
                  type="checkbox"
                  tabIndex={-1}
                  checked={checked.indexOf(value.basicInfo.refId) !== -1}
                  id={`itemsCheckbox-${value.basicInfo.refId}`}
                  onClick={handleToggle(value.basicInfo.refId)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 hidden"
                />
              </div>
              <div className="ml-2 text-md w-full h-full">
                <label
                  id
                  htmlFor={`itemsCheckbox-${value.basicInfo.refId}`}
                  className="font-medium text-gray-900 dark:text-gray-300 w-full h-full flex "
                >
                  <div className="flex w-full items-center gap-x-3">
                    <div className="flex">
                      <img
                        src={value.basicInfo.refProfile}
                        className="w-10 rounded-full"
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-md font-semibold text-gray-700">
                        {value.basicInfo.refName}
                      </p>
                      <span className="text-sm text-gray-500">
                        {value.basicInfo.refTel}
                      </span>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex w-full p-5">
      <div className="flex flex-col w-2/5 bg-red-200 rounded-lg p-2 gap-y-2">
        <div className="flex bg-white rounded-lg p-3">전체</div>
        <div className="flex w-full justify-start bg-white rounded-lg p-3">
          {resData ? customList(resData) : <div>??</div>}
        </div>
      </div>
      <div className="flex flex-col w-1/5 justify-center items-center gap-y-3 p-y-10">
        <button
          type="button"
          onClick={handleAllRight}
          className={OutlineButton({ type: "default", extra: "w-20" })}
        >
          {">>"}
        </button>
        <button
          type="button"
          onClick={handleCheckedRight}
          className={OutlineButton({ type: "default", extra: "w-20" })}
        >
          {">"}
        </button>
        <button
          type="button"
          onClick={handleCheckedLeft}
          className={OutlineButton({ type: "default", extra: "w-20" })}
        >
          {"<"}
        </button>
        <button
          type="button"
          onClick={handleAllLeft}
          className={OutlineButton({ type: "default", extra: "w-20" })}
        >
          {"<<"}
        </button>
      </div>
      <div className="flex flex-col w-2/5 bg-sky-200 rounded-lg p-2 gap-y-2">
        <div className="flex bg-white rounded-lg p-3">선택</div>
        <div className="flex w-full justify-start bg-white rounded-lg p-3"></div>
      </div>
    </div>
  );
};

export default RefereeSelect;
