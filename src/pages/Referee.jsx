import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Referee = () => {
  const count = useSelector((state) => state.player.value);
  return <div>{count}</div>;
};

export default Referee;
