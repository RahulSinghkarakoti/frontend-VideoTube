import React from "react";
// import thumbnail from "../img/image.png"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Card({
  thumbnail,
  title,
  views = 0,
  avatar,
  channel = "abcd",
  props,
}) {
  
  console.log("in card")
  const videoId = props._id;
  return (
    <Link to="/video" state={{ videoId }}>
      <div className={`bg-zinc-800 hover:border-2  border-white text-white sm:w-[27vw] w-full sm:h-full h-52 p-2 rounded-lg shadow-xl  `}>
        <div>
          <img
            src={thumbnail}
            alt="thumbnail"
            className="w-[100vw] z-1 sm:h-36 h-32  rounded-lg"
          />
        </div>
        <div className="flex items-center gap-3 px-1">
          <img src={avatar} alt="avatar" className="w-9 h-9 rounded-full" />
          <div className="   w-full ">
            <div className=" text-md font-semibold">{title.length>20 ?title.substring(0,20)+"...":title}</div>
            <div className=" text-slate-400 text-sm ">
              <h4>{channel}</h4>
              <span>{views} views</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
