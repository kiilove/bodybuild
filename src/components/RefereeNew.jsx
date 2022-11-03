import { collection, getCountFromServer, getDocs } from "firebase/firestore";
import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import { AddDoc } from "../firebases/AddDoc";
import { DefaultButton } from "../styles/Buttons";
import { SpanTitle } from "../styles/Common";

const RefereeNew = () => {
  const [basicInputs, setBasicInputs] = useState({});
  const [newId, setNewId] = useState(0);
  const [imageFiles, setImageFiles] = useState([]);
  const [downURL, setDownURL] = useState("");

  const handleInputs = (e) => {
    setBasicInputs({
      ...basicInputs,
      [e.target.name]: e.target.value,
    });
    //console.log(basicInputs);
  };

  const handleSave = async () => {
    //console.log(basicInputs);
    try {
      await handleImageUpload();
    } catch (error) {
      console.log(error.message);
    }

    //setBasicInputs({});
  };

  const handleImageUpload = () => {
    console.log(imageFiles[0].name);

    const storageRef = ref(storage, `images/${imageFiles[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFiles[0]);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //console.log("File available at", downloadURL);
          setBasicInputs({ ...basicInputs, refProfile: downloadURL });
          setDownURL(downloadURL);
          AddDoc({
            documentName: "referee",
            collectionName: String(basicInputs.refId),
            datas: { ...basicInputs, refProfile: downloadURL },
          });
          //console.log(basicInputs);
        });
      }
    );
  };
  const getId = async () => {
    try {
      const coll = collection(db, "referee");
      const refereeCollectionSnapshot = getCountFromServer(coll);
      const refereeCount = (await refereeCollectionSnapshot).data().count;
      //console.log(refereeCount);
      //const refereeCount = refereeCollectionSnapshot.data().count;

      setBasicInputs({ ...basicInputs, refId: String(refereeCount + 1) });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getId();
  }, []);

  const UploadInput = (
    <div className="flex justify-center items-center w-full">
      <label
        for="dropzoneFile"
        className="flex flex-col justify-center items-center w-full h-32 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col justify-center items-center pt-5 pb-6">
          <svg
            aria-hidden="true"
            class="mb-3 w-10 h-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            프로필 사진 업로드
          </p>
          <p className="text-xs">SVG, PNG, JPG or GIF</p>
        </div>
        <input
          type="file"
          id="dropzoneFile"
          className="hidden"
          onChange={(e) => setImageFiles([e.target.files[0]])}
        />
      </label>
    </div>
  );
  const BasicInput = (input) => (
    <div className="flex w-full bg-slate-50">
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
          <SpanTitle type="default" title="심판등록" />
        </div>
        <div className="flex py-5 w-full ">
          <div className="flex w-full box-border flex-wrap flex-col gap-y-3">
            {UploadInput}
            {BasicInput({ title: "이름", name: "refName" })}
            {BasicInput({ title: "지역", name: "refLocation" })}
            {BasicInput({ title: "이메일", name: "refEmail" })}
            {BasicInput({ title: "연락처", name: "refTel" })}
            {BasicInput({ title: "메모", name: "refMemo" })}
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

export default RefereeNew;
