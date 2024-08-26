import React, { useState } from "react";
import thumbnail from "../img/image.png";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toggleTweetLike } from "../api/likeService";
import { useSelector } from "react-redux";

function TweetCard({ props, onLike, onDelete ,onUpdate}) {
  const { isLiked, likesCount, _id, content, owner } = props;
  const userData = useSelector((state) => state.auth.userData);
  const [likeLoading, setLikeLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const { updatedAt } = props;
  function convertDate(updatedAt) {
    const date = new Date(updatedAt);
    
    const options = {
      timeZone: 'Asia/Kolkata', // Assuming IST (UTC+5:30)
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    
    const formattedDate = date.toLocaleString('en-US', options);
    return formattedDate;
  }

  const handleLike = async () => {
    console.log("tweet", _id);
    setLikeLoading(true);
    try {
      await onLike(_id);
    } catch (error) {
      console.error("error in tweet like", error);
    }
    setLikeLoading(false);
  };

  const handleDelete = async () => {
    console.log("in delete .. card")
    try {
      await onDelete(_id);
      setShowMenu(false)
    } catch (error) {
      console.error("error in tweet delete", error);
    }
  };

  const handleUpdate = async () => {
    console.log("in update .. card")
    try {
      await onUpdate(_id,content);
      setShowMenu(false)
    } catch (error) {
      console.error("error in tweet update", error);
    }
  };

  return (
    <div className="break-inside-avoid mb-4 p-2 bg-zinc-800 rounded-xl shadow">
      <div className="flex flex-col gap-2 text-zinc-300">
        <div className="flex items-start gap-3  ">
          <img
            src={owner[0]?.avatar || thumbnail}
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
          <button
            className="flex flex-col items-center text-xs"
            onClick={handleLike}
          >
            {likeLoading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : isLiked ? (
              <FaHeart className="w-6 h-6 text-red-600" />
            ) : (
              <FaRegHeart className="w-6 h-6" />
            )}
            <p>{likesCount} likes</p>
          </button>
          {owner && owner[0]?._id === userData._id ? (
            <div className="relative z-10 "  >
              <BsThreeDotsVertical
                size={20}
                onClick={() => setShowMenu((prev) => !prev)}
              />
              {
                showMenu && (
                  <div  className="absolute bottom-6 right-0 rounded-xl  @apply backdrop-blur-lg backdrop-saturate-[280%] bg-[rgba(18,18,18,0.84)]   text-white  p-2 text-lg w-32  cursor-pointer text-center"  >
                   <div className="text-red-900 font-semibold" onClick={handleDelete}>Delete</div>
                   <div onClick={handleUpdate} >Update</div>
                  </div>

                )
              }

            </div>
            
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default TweetCard;
