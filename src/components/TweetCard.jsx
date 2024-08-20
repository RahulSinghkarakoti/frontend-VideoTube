import React, { useState } from "react";
import thumbnail from "../img/image.png";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toggleTweetLike } from "../api/likeService";
import { useSelector } from "react-redux";

function TweetCard({  content = "lorem", props,onToggle,owner }) {

  // const [liked,setLiked]=useState(false)
  const {isLiked,likesCount,_id}=props
  // const {avatar,username}=props.owner[0]
  // console.log(avatar)
  // console.log(owner)
  const userData = useSelector((state) => state.auth.userData);

  const { updatedAt } = props;
  function convertDate(updatedAt){

    const date=new Date(updatedAt)
    const day = date.getUTCDate();
    const month = date.toLocaleString("en-US", {
      month: "short",
      timeZone: "UTC",
    });
    const year = date.getUTCFullYear();
  
    // Get the hours and minutes
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
  
    // Convert to 12-hour format and determine AM/PM
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
  
    // Add leading zero to minutes if needed
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
    // Combine everything into the final format
    const formattedDate = `${day} ${month} ${year}, ${hours}:${formattedMinutes} ${ampm}`;
    return formattedDate;
  }

  
 

  return (
    <div className="break-inside-avoid mb-4 p-2 bg-zinc-800 rounded-xl shadow">
      <div className="flex flex-col gap-2 text-zinc-300">
        <div className="flex items-start gap-3  ">
          <img
            src={   owner[0]?.avatar || thumbnail}
            alt=""
            className="w-12 h-12 rounded-full "
          />
          <div>
            <p>{owner[0]?.username || "chnnel"}</p>
            <p className="text-xs">{convertDate(updatedAt)}</p>
          </div>
        </div>
        <p className="bg-zinc-700 text-white p-2 rounded-xl ">{content}</p>
        <div className="flex items-center justify-between p-2">
          <div className="flex flex-col items-center text-xs" onClick={()=>onToggle(_id)}>
           
            {
              isLiked  ?
              <FaHeart className="w-6 h-6 text-red-600" />
              :
              <FaRegHeart className="w-6 h-6" />

            }
          <p >{likesCount} likes</p>
          </div>
          {
            owner[0]?._id === userData._id ?
            <BsThreeDotsVertical size={20} />:
            null
          }
        </div>
      </div>
    </div>
  );
}

export default TweetCard;
