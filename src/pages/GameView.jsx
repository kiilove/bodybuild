import { collection, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { SpanTitle } from "../styles/Common";

const GameView = (props) => {
  const [resData, setResData] = useState([]);
  const { gameId } = useParams();

  const getList = async (props) => {
    let dataArray = [];
    try {
      const resDoc = await getDocs(
        collection(db, props.documentName, props.collectionName)
      );
      resDoc.forEach((doc) => {
        dataArray.push({ id: doc.id, ...doc.data() });
      });
      console.log(dataArray);
    } catch (error) {
      console.log(error);
    } finally {
      setResData(dataArray);
    }
  };

  useEffect(() => {
    getList({ documentName: "games", collectionName: gameId });
  }, []);
  return (
    <div className="flex min-w-full p-10 box-border flex-wrap ">
      <div className="flex flex-col flex-wrap w-full">
        <div className="flex w-full">
          <SpanTitle type="default" title="경기정보" />
          {gameId}
        </div>
      </div>
      <div className="flex py-5 w-full">
        <div className="flex box-border flex-wrap flex-col gap-y-3 w-full ">
          <div className="flex w-2/3 bg-slate-50 ">
            <div className="flex w-full h-12 bg-slate-300 items-center">
              <span className="flex w-1/4 h-10 justify-end items-center px-4">
                대회명
              </span>
              <div className="flex w-3/4 bg-slate-100 justify-center items-center h-full">
                <input
                  type="text"
                  className="border border-gray-300 bg-transparent outline-none text-neutral-800 text-md font-semibold placeholder:text-white rounded-md w-11/12 h-10 px-2"
                />
              </div>
            </div>
          </div>
          <div className="flex w-2/3 bg-slate-50 ">
            <div className="flex w-full h-12 bg-slate-300 items-center">
              <span className="flex w-1/4 h-10 justify-end items-center px-4">
                회차
              </span>
              <div className="flex w-3/4 bg-slate-100 justify-center items-center h-full">
                <input
                  type="text"
                  className="border border-gray-300 bg-transparent outline-none text-neutral-800 text-md font-semibold placeholder:text-white rounded-md w-11/12 h-10 px-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameView;
