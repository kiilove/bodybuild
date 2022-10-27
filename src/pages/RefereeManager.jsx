import React, { useState } from "react";
import { SpanTitle } from "../styles/Common";
import { Button, Modal, Table } from "flowbite-react";
import RefereeNew from "../components/RefereeNew";
const tData = [
  { id: 1, name: "김진배1", inDate: "19/1/1" },
  { id: 2, name: "김진배2", inDate: "19/1/1" },
  { id: 3, name: "김진배3", inDate: "19/1/1" },
  { id: 4, name: "김진배4", inDate: "19/1/1" },
  { id: 5, name: "김진배5", inDate: "19/1/1" },
];
const tHeader = [
  { id: 1, title: "ID" },
  { id: 2, title: "심판" },
  { id: 3, title: "등록일자" },
];
const RefereeManager = () => {
  const [modal, setModal] = useState(false);

  return (
    <div className="flex min-w-full p-10 box-border flex-wrap ">
      <div className="flex flex-col flex-wrap w-full">
        <div className="flex w-full">
          <SpanTitle type="default" title="심판정보" />
        </div>
        <div className="flex w-full justify-end px-5">
          <Button outline={true} onClick={() => setModal(true)}>
            신규등록
          </Button>
        </div>
        <Modal
          show={modal}
          size="4xl"
          popup={true}
          onClose={() => setModal(false)}
        >
          <Modal.Header />
          <Modal.Body className="">
            <RefereeNew />
          </Modal.Body>
        </Modal>
        <div className="flex py-5 ">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {tHeader.map((item, idx) => (
                  <th className="py-3 px-6">{item.title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tData.map((item, idx) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="p-4 w-4">{item.id}</td>
                  <td className="p-4 w-40">{item.name}</td>
                  <td className="p-4 w-4">{item.inDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RefereeManager;
