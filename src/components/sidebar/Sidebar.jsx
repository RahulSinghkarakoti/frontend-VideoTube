import React from "react";
import { MdHome } from "react-icons/md";
import { AiTwotoneLike } from "react-icons/ai";
import { FaHistory } from "react-icons/fa";
import { IoVideocamOutline } from "react-icons/io5";
import { FaRegFolder } from "react-icons/fa";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import { FaTwitter } from "react-icons/fa";

function Sidebar() {
  const navigate = useNavigate();
  return (
    // <div className="bg-black flex flex-row sm:flex-col sm:justify-start justify-between sm:gap-2 gap-1 text-white p-2 sm:p-1 text-xl sm:text-2xl text-center h-auto sm:h-[100vh] fixed   sm:static sm:left-auto left-0 z-10 sm:bottom-auto bottom-0 w-full  ">
    <div className="bg-black flex flex-row sm:flex-col sm:justify-start justify-between sm:gap-2 gap-1 text-white p-2 sm:p-1 text-xl sm:text-2xl text-center h-auto sm:h-[100vh] fixed sm:static sm:left-auto left-0 bottom-0   w-full">
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          isActive
            ? " text-blue-500 font-bold bg-zinc-800 rounded-xl "
            : "text-gray-500"
        }
      >
        <div className="flex  flex-col items-center hover:bg-zinc-800 rounded-xl  p-1 mb-2 ">
          <MdHome size={20} />
          <span className="sm:text-xs text-[9px]">Home</span>
        </div>
      </NavLink>
      <NavLink
        to={"/likedvideo"}
        className={({ isActive }) =>
          isActive
            ? "text-blue-500 font-bold bg-zinc-800 rounded-xl"
            :  "text-gray-500"
        }
      >
        <div className="flex flex-col items-center   hover:bg-zinc-800 rounded-xl  p-1 mb-2 ">
          <AiTwotoneLike size={20} className="" />
          <span className="sm:text-xs text-[9px]">Liked Videos</span>
        </div>
      </NavLink>
      <NavLink
        to={"/history"}
        className={({ isActive }) =>
          isActive
            ? "text-blue-500 font-bold bg-zinc-800 rounded-xl"
            : "text-gray-500"
        }
      >
        <div className="flex flex-col items-center  hover:bg-zinc-800 rounded-xl   p-1 mb-2">
          <FaHistory size={20} />
          <span className="sm:text-xs text-[9px]">History</span>
        </div>
      </NavLink>
      <NavLink
        to={"/channel"}
        className={({ isActive }) =>
          isActive
            ? "text-blue-500 font-bold bg-zinc-800 rounded-xl"
            : "text-gray-500"
        }
      >
        <div className="flex flex-col items-center   hover:bg-zinc-800 rounded-xl  p-1 mb-2">
          <IoVideocamOutline size={20} />
          <span className="sm:text-xs text-[9px]">My Content</span>
        </div>
      </NavLink>
      <NavLink
        to={"/playlist"}
        className={({ isActive }) =>
          isActive
            ? "text-blue-500 font-bold bg-zinc-800 rounded-xl"
            : "text-gray-500"
        }
      >
        <div className="flex flex-col items-center   hover:bg-zinc-800 rounded-xl  p-1 mb-2">
          <FaRegFolder size={20} />
          <span className="sm:text-xs text-[9px]">Playlists</span>
        </div>
      </NavLink>

      <NavLink
        to={"/tweets"}
        className={({ isActive }) =>
          isActive
            ? "text-blue-500 font-bold bg-zinc-800 rounded-xl"
            : "text-gray-500"
        }
      >
        <div className="flex flex-col items-center   hover:bg-zinc-800 rounded-xl  p-1 mb-2">
          <FaTwitter size={20} />
          <span className="sm:text-xs text-[9px]">Tweet</span>
        </div>
      </NavLink>

     
    </div>
  );
}

export default Sidebar;
