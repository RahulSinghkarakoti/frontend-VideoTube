import React from "react";
import { FaFolderPlus } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import thumbnail from "../img/image.png";
import { FaRegHeart } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";


function Tweet() {
  return (
    <div className="flex h-screen w-full">
      <div className="bg-zinc-900  sm:pl-[10vw]   scrollbar-hide  flex-1 overflow-auto">
        <div className="h-full  text-black  p-2">
         
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-4">
            <div className="break-inside-avoid mb-4 p-4 text-white background-animate  bg-gradient-to-r from-green-500   via-violet-500  to-pink-600  rounded-xl ">
              <IoAddCircle className="text-5xl" />
              Share Your Thoughts
            </div>
            <div className="break-inside-avoid mb-4 p-2 bg-zinc-800 rounded-xl shadow">
              <div className="flex flex-col gap-2 text-zinc-300">
                <div className="flex items-start gap-3  ">
                    <img src={thumbnail} alt="" className="w-12 h-12 rounded-full " />
                    <p>channel name</p>
                </div>
              <p className="bg-zinc-700 text-white p-2 rounded-xl ">
                Exploring the latest trends in web development. #webdev Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam, ullam eos! Repellendus.
                #javascript
              </p>
              <div className="flex items-center justify-between p-2">

              <FaRegHeart className="w-6 h-6"/>
              <BsThreeDotsVertical size={20}/>
              </div>
              </div>
            </div> 

            <div className="break-inside-avoid mb-4 p-2 bg-zinc-800 rounded-xl shadow">
            <div className="flex flex-col gap-2 text-zinc-300">
                <div className="flex items-start gap-3  ">
                    <img src={thumbnail} alt="" className="w-12 h-12 rounded-full " />
                    <p>channel name</p>
                </div>
              <p className="bg-zinc-700 text-white p-2 rounded-xl ">
                Exploring the  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus sit dolores aliquam harum consequatur veritatis assumenda, facilis iure. Molestias, deserunt.
              </p>
              <div className="flex items-center justify-between p-2">

              <FaRegHeart className="w-6 h-6"/>
              <BsThreeDotsVertical size={20}/>
              </div>
              </div>
            </div>
 
            
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tweet;
