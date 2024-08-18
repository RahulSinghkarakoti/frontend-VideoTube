import React from "react";
import { FcOpenedFolder } from "react-icons/fc";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";

function Playlistcard({ name = "playlist name" }) {
  return (
    <div className="bg-zinc-700    rounded-xl flex flex-col items-center p-2  m-1 text-zinc-400 hover:border-2 border-white">
      <div>
        <FcOpenedFolder size={140} />
      </div>
      <div className="flex justify-center  w-full">
      <h1 className="text-white font-semibold text-center">{name}</h1> 
      
      </div>
    </div>
  );
}

export default Playlistcard;
