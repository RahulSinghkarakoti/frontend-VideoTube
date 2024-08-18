import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import thumbnail from "../img/image.png";
import { deletePlaylist, getPlaylistById, removeFromPlaylist } from "../api/playlistService";
import { MdDelete } from "react-icons/md";
import PopupMsg from "../components/PopupMsg";
import { RxCross2 } from "react-icons/rx";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Loader } from "../components";

function PlaylistById() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);

  const getPlaylist = async () => {
    try {
      setLoading(true);
      const response = await getPlaylistById(id);
      setPlaylist(response.data[0]);
      // console.log(response.data[0].videos)
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    console.log("in delete playlist");
    try {
      const response = await deletePlaylist(id);
      if (response.statusCode) {
        setMessage("Playlist deleted successfully");
        setShowPopup(true);
        setTimeout(() => {
          navigate("/playlist");
        }, 2000);
      } else {
        alert("Playlist not deleted");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const removeVideo=async(videoId)=>{
    console.log("in roemove video from playlist")
   try {
     const response=await removeFromPlaylist(videoId,id)
     console.log(response)
     getPlaylist();
   } catch (error) {
    console.log(error)
   }
  };

  useEffect(() => {
    getPlaylist();
  }, []);

  const toggleMenu = (itemId) => {
    if (activeMenu === itemId) {
      setActiveMenu(null);
    } else {
      setActiveMenu(itemId);
    }
  };



  return (
    <div className="flex  h-screen w-full">
      <div className="bg-[#1E201E]   sm:pl-[10vw]    flex-1 overflow-auto    text-white">
        {showPopup && <PopupMsg message={message} />}
        <div className="   sm:flex  ">
          {playlist ? (
            <>
              <div className="  sm:w-[40%] sm:h-[80vh]  rounded-xl p-2 ">
                <div className="flex flex-col gap-3 text-white text-md  h-full rounded-xl bg-zinc-800 p-2">
                  <div className="  flex  justify-between items-center p-2 rounded-xl font-semibold">
                    <h1 className="text-5xl">{playlist.name}</h1>
                    <div
                      onClick={handleDelete}
                      className=" border-2 border-white rounded-xl p-2 hover:text-red-600 hover:border-red-600"
                    >
                      <MdDelete size={30} />
                      <p className="text-xs">Delete</p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center text-zinc-300">
                    <img
                      src={playlist.owner.avatar}
                      alt="thumbnail"
                      className="rounded-full w-10 h-10"
                    />
                    <div> {playlist.owner.username} </div>
                  </div>
                  <div className="flex gap-2">
                    <p className="bg-zinc-400 rounded-full p-1 text-xs text-gray-900">
                      {playlist.totalViews} views
                    </p>
                    <p className="bg-zinc-400 rounded-full p-1 text-xs text-gray-900">
                      {playlist.totalVideos} videos
                    </p>
                    <p className="bg-zinc-400 rounded-full p-1 text-xs text-gray-900">
                      {Math.round(playlist.totalDuration)} seconds
                    </p>
                  </div>
                  <div className="text-xl  bg-zinc-600 p-2 h-full rounded-xl ">
                    {playlist.description || "no description "}
                  </div>
                </div>
              </div>

              <div className="  sm:w-[60%]  sm:h-[80vh]  rounded-xl p-2 flex flex-col gap-2">
                {playlist.videos.length > 0 ? (
                  playlist.videos.map((item, index) => (
                    <div className="flex gap-2 hover:border-2 border-white  rounded-xl bg-zinc-800  p-2">
                      <Link
                        to="/video"
                        key={index}
                        state={{ videoId: item._id }}
                      >
                        <div className="text-white text-md flex  gap-2  ">
                          <img
                            src={item.thumbnail}
                            className=" w-[400px] h-32   rounded-xl "
                            alt=""
                          />
                          <div className="p-2 w-full  flex flex-col justify-between   ">
                            <p className="text-2xl">
                              {item.title.length > 35
                                ? item.title.substring(0, 35) + "...."
                                : item.title}{" "}
                            </p>
                            <div className="flex items-center gap-3">
                              <img
                                src={thumbnail}
                                className="w-10 h-10 rounded-full"
                                alt="avatar"
                              />
                              <div className="text-zinc-300">
                                <p>channel name</p>
                                <p> {item.views} views</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="relative">
                        <BsThreeDotsVertical
                          size={20}
                          onClick={() => toggleMenu(item._id)}
                          className="cursor-pointer hover:text-gray-400"
                        />
                        {activeMenu === item._id && (
                          <div className="absolute right-0 mt-2 w-32 bg-zinc-800 p-3 rounded-lg shadow-lg shadow-white text-white text-sm">
                            <p
                              onClick={() => removeVideo(item._id)}
                              className="cursor-pointer hover:text-red-500"
                            >
                              Remove
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className=" text-2xl font-semibold text-center  rounded-xl p-2  bg-zinc-800">
                      No videos in this playlist
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
             <div className="w-full sm:h-[80vh]  flex justify-center items-center">
              <Loader/>
             </div>
             
          )}
        </div>
      </div>
    </div>
  );
}

export default PlaylistById;
