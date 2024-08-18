import React from "react";
import thumbnail from "../img/image.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function SkeletonCard() {

  return (
    <div className="bg-zinc-800     text-white sm:w-[27vw] w-full sm:h-full h-52 p-2 rounded-lg   ">
      <div className="w-full sm:h-36 h-32 rounded-lg bg-zinc-600 animate-pulse  "></div>
      <div className="flex items-center gap-3 sm:py-3">
        <div className="w-9 h-9 rounded-full bg-zinc-600 animate-pulse" />
        <div className="">
            <div className="  sm:h-3 h-2 w-20 bg-zinc-600 animate-pulse my-1 "></div>
            <div className="  ">
              <div className="w-10 h-3 bg-zinc-600 animate-pulse my-1"></div>
              <div className="w-7 h-3 sm:text-md text-xs bg-zinc-600 animate-pulse my-1"></div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default SkeletonCard;
