import React from "react";
import { Link } from "react-router-dom";
import std from "../img/logo/std.png";
const MenuItem = [
  { id: 1, title: "새 경기", link: "/newgame" },
  { id: 3, title: "경기 목록", link: "/gamelist" },
  { id: 4, title: "심판", link: "/referee" },
  { id: 5, title: "선수", link: "/player" },
  { id: 6, title: "관리자", link: "/admin" },
];
const LeftMenus = () => {
  return (
    <div className="flex w-44">
      <div className="flex flex-col w-full">
        {MenuItem &&
          MenuItem.map((item, idx) => (
            <div
              className="flex w-full h-14 gap-y-5 items-center align-middle justify-center "
              id={idx}
            >
              <Link to={item.link}>
                <span className="flex">{item.title}</span>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LeftMenus;
