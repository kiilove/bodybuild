import React from "react";
import { SpanTitle } from "../styles/Common";

const RefereeManager = () => {
  return (
    <div className="flex min-w-full p-10 box-border flex-wrap">
      <div className="flex flex-col flex-wrap w-full">
        <div className="flex w-full">
          <SpanTitle type="default" title="심판정보" />
        </div>
        <div className="flex py-5 w-full"></div>
      </div>
    </div>
  );
};

export default RefereeManager;
