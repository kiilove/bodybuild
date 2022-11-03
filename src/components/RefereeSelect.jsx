import { collection, getDocs } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../firebase";
import { OutlineButton } from "../styles/Buttons";
import { SpanTitle } from "../styles/Common";
function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  //console.log(a);
  return a.filter((value) => b.indexOf(value) !== -1);
}
const RefereeSelect = () => {
  const [checked, setChecked] = useState([]);
  const [pool, setPool] = useState([]);
  const [assign, setAssign] = useState([]);

  const poolChecked = intersection(checked, pool);
  const assignChecked = intersection(checked, assign);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    //console.log(checked);
  };

  const handleAllAssign = () => {
    setAssign(assign.concat(pool));
    setPool([]);
  };

  const handleCheckedAssign = () => {
    setAssign(assign.concat(poolChecked));
    setPool(not(pool, poolChecked));
    setChecked(not(checked, poolChecked));
    //console.log(assign);
  };

  const handleCheckedPool = () => {
    setPool(pool.concat(assignChecked));
    setAssign(not(assign, assignChecked));
    setChecked(not(checked, assignChecked));
    //console.log(pool);
  };

  const handleAllPool = () => {
    setPool(pool.concat(assign));
    setAssign([]);
  };

  // const handleAllLeft = () => {
  //   setLeft(left.concat(right));
  //   setRight([]);
  // };

  // const handleAllRight = () => {
  //   setRight(right.concat(left));
  //   setLeft([]);
  // };

  // const handleCheckedRight = () => {
  //   setRight(right.concat(leftChecked));
  //   setLeft(not(left, leftChecked));
  //   setChecked(not(checked, leftChecked));
  //   console.log(right);
  // };

  // const handleCheckedLeft = () => {
  //   setLeft(left.concat(rightChecked));
  //   setRight(not(right, rightChecked));
  //   setChecked(not(checked, rightChecked));
  //   console.log(left);
  // };

  // const handleAllLeft = () => {
  //   setLeft(left.concat(right));
  //   setRight([]);
  // };

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
      //setResData(dataArray);
      setPool(dataArray);
      //console.log(dataArray);
    }
  };

  useEffect(() => {
    getList({ documentName: "referee" });
    //console.log(resData);
  }, []);

  const customList = (items) => {
    //console.log(items[0]);
    return (
      <div className="flex w-full h-72 overflow-auto">
        <div className="flex flex-col gap-y-2 w-full p-1">
          {items.map((value, idx) => (
            <div
              className={`flex h-13 w-full p-3 justify-center items-center border border-gray-300 rounded-md  ${
                checked.indexOf(value) !== -1 && " border-sky-600 "
              }`}
            >
              <div className="flex items-center h-5 justify-center ">
                <input
                  type="checkbox"
                  tabIndex={-1}
                  checked={checked.indexOf(value.basicInfo.refId) !== -1}
                  id={`itemsRefereeCheckbox-${value.basicInfo.refId}`}
                  onClick={handleToggle(value)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 hidden"
                />
              </div>
              <div className="ml-2 text-md w-full h-full">
                <label
                  id
                  htmlFor={`itemsRefereeCheckbox-${value.basicInfo.refId}`}
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
    <div className="flex flex-col w-full divide-y-2 gap-y-2">
      <div className="flex w-full px-10">
        <div className="flex w-1/2 items-center align-middle">
          <SpanTitle type="subTitle" title="심판" />
        </div>
        <div className="flex w-1/2 justify-end items-center align-middle">
          <button className={OutlineButton({ type: "default" })}>
            배정완료
          </button>
        </div>
      </div>
      <div className="flex w-full px-10 py-5">
        <div className="flex flex-col w-2/5 bg-red-200 rounded-lg p-2 gap-y-2">
          <div className="flex bg-white rounded-lg p-3">전체</div>
          <div className="flex w-full justify-start bg-white rounded-lg p-3">
            {pool ? customList(pool) : <div></div>}
          </div>
        </div>
        <div className="flex flex-col w-1/5 justify-center items-center gap-y-3 p-y-10">
          <button
            type="button"
            onClick={handleAllAssign}
            className={OutlineButton({ type: "default", extra: "w-20" })}
          >
            {">>"}
          </button>
          <button
            type="button"
            onClick={handleCheckedAssign}
            className={OutlineButton({ type: "default", extra: "w-20" })}
          >
            {">"}
          </button>
          <button
            type="button"
            onClick={handleCheckedPool}
            className={OutlineButton({ type: "default", extra: "w-20" })}
          >
            {"<"}
          </button>
          <button
            type="button"
            onClick={handleAllPool}
            className={OutlineButton({ type: "default", extra: "w-20" })}
          >
            {"<<"}
          </button>
        </div>
        <div className="flex flex-col w-2/5 bg-sky-200 rounded-lg p-2 gap-y-2">
          <div className="flex bg-white rounded-lg p-3">배정됨</div>
          <div className="flex w-full justify-start bg-white rounded-lg p-3">
            {assign ? customList(assign) : <div></div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefereeSelect;
