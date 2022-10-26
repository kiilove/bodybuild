import { Button, Card } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { SpanTitle } from "../styles/Common";
import { GetDocs } from "../firebases/getDoc";
import { db } from "../firebase";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";

const GameList = () => {
  const [resData, setResData] = useState([]);

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
    }
  };

  useEffect(() => {
    getList({ documentName: "경기용인보디빌딩대회" });
  }, []);

  return (
    <div className="flex min-w-full p-10 box-border flex-wrap ">
      <div className="flex flex-col flex-wrap w-full">
        <div className="flex w-full">
          <SpanTitle type="default" title="경기목록" />
        </div>
        <div className="flex w-full flex-wrap gap-5 justify-around">
          {resData &&
            resData.map((item, idx) => (
              <div className="max-w-sm">
                <Card imgSrc={item.basicInfo.cupPoster}>
                  <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {item.basicInfo.cupTitle + " " + item.basicInfo.cupCount}
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    장소 : {item.basicInfo.cupLocation}
                  </p>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    일시 : {item.basicInfo.cupDate}
                  </p>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    주최 : {item.basicInfo.cupOrg}
                  </p>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    상태 : {item.basicInfo.cupState}
                  </p>
                  <div className="flex w-full justify-end mt-1 gap-x-5">
                    <Button color="none">
                      <PencilSquareIcon className=" h-5 w-5" />
                    </Button>
                    <Button color="failure">
                      <TrashIcon className="h-5 w-5" />
                    </Button>
                  </div>
                </Card>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default GameList;
