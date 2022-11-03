import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlayerSelect from "../components/PlayerSelect";
import RefereeSelect from "../components/RefereeSelect";
import { db } from "../firebase";
import { SpanTitle } from "../styles/Common";

const GameView = (props) => {
  const [resData, setResData] = useState({});
  const [editMode, setEditeMode] = useState(false);
  const { gameId } = useParams();

  const getList = async (props) => {
    let objRes = {};
    try {
      const resDoc = await getDoc(
        doc(db, props.documentName, props.collectionName)
      );
      // resDoc.forEach((doc) => {
      //   dataArray.push({ id: doc.id, ...doc.data() });
      // });
      objRes = resDoc.data();
    } catch (error) {
      console.log(error);
    } finally {
      //setResData(dataArray);
      setResData(() => objRes);
      console.log(resData);
    }
  };

  useEffect(() => {
    getList({ documentName: "games", collectionName: gameId });
  }, []);
  return (
    <div className="flex min-w-full p-10 box-border flex-wrap gap-y-5">
      {resData.basicInfo && (
        <>
          <div className="flex flex-col flex-wrap w-full">
            <div className="flex w-full">
              <SpanTitle
                type="default"
                title={
                  resData.basicInfo.cupTitle + " " + resData.basicInfo.cupCount
                }
              />
            </div>
          </div>
          <div className="flex w-full bg-white px-10 rounded-lg shadow-md">
            <div className="flex py-5 w-full">
              <div className="flex box-border flex-wrap flex-col gap-y-3 w-full ">
                <div className="flex">
                  <SpanTitle type="subTitle" title="경기" />
                </div>
                <div className="flex w-2/3 bg-slate-50 ">
                  <div className="flex w-full h-12 bg-slate-300 items-center">
                    <span className="flex w-1/4 h-10 justify-end items-center px-4">
                      대회명
                    </span>
                    <div className="flex w-3/4 bg-white justify-center items-center h-full">
                      <input
                        type="text"
                        className="border border-gray-300 bg-transparent outline-none text-neutral-800 text-md font-semibold placeholder:text-white rounded-md w-11/12 h-10 px-2"
                        value={resData.basicInfo.cupTitle}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex w-2/3 bg-slate-50 ">
                  <div className="flex w-full h-12 bg-slate-300 items-center">
                    <span className="flex w-1/4 h-10 justify-end items-center px-4">
                      회차
                    </span>
                    <div className="flex w-3/4 bg-white justify-center items-center h-full">
                      <input
                        type="text"
                        className="border border-gray-300 bg-transparent outline-none text-neutral-800 text-md font-semibold placeholder:text-white rounded-md w-11/12 h-10 px-2"
                        value={resData.basicInfo.cupCount}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex w-2/3 bg-slate-50 ">
                  <div className="flex w-full h-12 bg-slate-300 items-center">
                    <span className="flex w-1/4 h-10 justify-end items-center px-4">
                      주최기관
                    </span>
                    <div className="flex w-3/4 bg-white justify-center items-center h-full">
                      <input
                        type="text"
                        className="border border-gray-300 bg-transparent outline-none text-neutral-800 text-md font-semibold placeholder:text-white rounded-md w-11/12 h-10 px-2"
                        value={resData.basicInfo.cupOrg}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex w-2/3 bg-slate-50 ">
                  <div className="flex w-full h-12 bg-slate-300 items-center">
                    <span className="flex w-1/4 h-10 justify-end items-center px-4">
                      경기장소
                    </span>
                    <div className="flex w-3/4 bg-white justify-center items-center h-full">
                      <input
                        type="text"
                        className="border border-gray-300 bg-transparent outline-none text-neutral-800 text-md font-semibold placeholder:text-white rounded-md w-11/12 h-10 px-2"
                        value={resData.basicInfo.cupLocation}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex w-2/3 bg-slate-50 ">
                  <div className="flex w-full h-12 bg-slate-300 items-center">
                    <span className="flex w-1/4 h-10 justify-end items-center px-4">
                      경기일자
                    </span>
                    <div className="flex w-3/4 bg-white justify-center items-center h-full">
                      <input
                        type="text"
                        className="border border-gray-300 bg-transparent outline-none text-neutral-800 text-md font-semibold placeholder:text-white rounded-md w-11/12 h-10 px-2"
                        value={resData.basicInfo.cupDate}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full bg-white rounded-lg shadow-md">
            <div className="flex py-5 w-full">
              <div className="flex box-border flex-wrap flex-col gap-y-3 w-full ">
                <div className="flex w-full">
                  <RefereeSelect />
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full bg-white rounded-lg shadow-md">
            <div className="flex py-5 w-full">
              <div className="flex box-border flex-wrap flex-col gap-y-3 w-full ">
                <div className="flex w-full">
                  <PlayerSelect />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GameView;
