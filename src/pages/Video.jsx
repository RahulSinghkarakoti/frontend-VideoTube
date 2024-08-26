import React, { useEffect, useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { RiArrowDropDownLine,RiArrowDropUpLine } from "react-icons/ri";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { getVideo, updateVideoView } from "../api/videoService";
import { TbBell, TbBellRinging } from "react-icons/tb";
import {
  addVideoComment,
  deleteVideoComment,
  getVideoComment,
} from "../api/commentService";
import { toggleCommentLike, toggleVideoLike } from "../api/likeService";
import { useSelector } from "react-redux";
import PopupMsg from "../components/PopupMsg";
import {
  addToPlaylist,
  createPlaylist,
  getUserPlaylists,
} from "../api/playlistService";
import { toggleSubscription } from "../api/subscription";
import "../components/Loader/LineLoader.css";

function Video() {
  const location = useLocation();
  const { videoId } = location.state || {};
  const [videoData, setVideoData] = useState({});
  const [like, setLike] = useState(false);
  const [subscribe, setSubscribe] = useState(false);
  const [comments, setComments] = useState({});
  const docs = comments?.docs || [];
  const loggedInUser = useSelector((state) => state.auth.userData);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isPlaylistFormVisible, setIsPlaylistFormVisible] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [ProcessLoading, setProcessLoading] = useState(false);

  const [isDescOpen, setIsDescOpen] = useState(false);

  const fetchPlaylists = async () => {
    console.log("fetching playlists");
    try {
      const response = await getUserPlaylists(loggedInUser._id);
      // console.log(response)
      setPlaylists(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    console.log("in create plalist");
    const formData = new FormData(e.target);
    const playlist = formData.get("name");
    formData.append("decription", "nothing");
    console.log(playlist);
    console.log(formData.get("decription"));

    setIsPlaylistFormVisible(!isPlaylistFormVisible);
    const response = await createPlaylist(formData);
    console.log(response);
    fetchPlaylists();
    setIsMenuVisible(!isMenuVisible);
  };

  const deleteComment = async (commentId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this video?"
    );
    if (confirmed) {
      try {
        setProcessLoading(true);
        const response = await deleteVideoComment(commentId);
        if (response.success) {
          setProcessLoading(false);

          setMessage("comment deleted ");
          setShowPopup(true);
        }
        setTimeout(() => {
          setMessage("");
          setShowPopup(false);
          fetchComment();
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    }
  };

  function checkUserComment(commentOwnerId) {
    if (loggedInUser._id === commentOwnerId) {
      return true;
    }
    return false;
  }

  function handleNewComment(e) {
    e.preventDefault();
    try {
      setProcessLoading(true);
      const formData = new FormData(e.target);
      const comment = formData.get("comment");
      addComment(formData);
      e.target.reset();
    } catch (error) {
      console.error(error);
    }
  }

  const addComment = async (formData) => {
    try {
      const response = await addVideoComment(videoId, formData);
      setProcessLoading(false);
      fetchComment();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchComment = async () => {
    try {
      const response = await getVideoComment(videoId);
      setComments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchVideo = async () => {
    try {
      const response = await getVideo(videoId);
      const videoinfo = response.data[0];
      setVideoData(videoinfo);
      console.log(response.data[0]);
      setSubscribe(videoinfo.isSubscribed);

      if (videoinfo.isLikedByUser) {
        setLike(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = async (videoId) => {
    try {
      const response = await toggleVideoLike(videoId);
      fetchVideo();
      if (response.message === "video liked ") {
        setLike(true);
        setShowPopup(true);
        setMessage("video liked");
        setTimeout(() => {
          setMessage("");
          setShowPopup(false);
        }, 1000);
      }
      if (response.message === "video unliked ") {
        setLike(false);
        setShowPopup(true);

        setMessage("video unliked");
        setTimeout(() => {
          setMessage("");
          setShowPopup(false);
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentLike = async (commentId) => {
    console.log("comment like");
    try {
      const response = await toggleCommentLike(commentId);
      if (response.message === "comment liked ") {
        setShowPopup(true);
        setMessage("comment liked ");
        setTimeout(() => {
          setMessage("");
          setShowPopup(false);
        }, 1000);
      }
      if (response.message === "comment unliked ") {
        setShowPopup(true);
        setMessage("comment unliked");
        setTimeout(() => {
          setMessage("");
          setShowPopup(false);
        }, 1000);
      }
      fetchComment();
    } catch (error) {
      console.error(error);
    }
  };

  const addVideoToPlaylist = async (playlistId) => {
    console.log("add video to playlist");
    try {
      const response = await addToPlaylist(videoId, playlistId);
      setShowPopup(true);
      setMessage("video added successfull");
      setTimeout(() => {
        setMessage("");
        setShowPopup(false);
        setIsMenuVisible(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubscribe = async (_id) => {
    console.log("in handle subscribe");
    try {
      setProcessLoading(true);
      const response = await toggleSubscription(_id);
      console.log(response.data);
      setSubscribe((prev) => !prev);
      setShowPopup(true);
      setProcessLoading(false);
      setMessage(response.data);
      setTimeout(() => {
        setMessage("");
        setShowPopup(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVideo();
    fetchComment();
  }, [videoId]);

  const ownerDetail = videoData.ownerDetail || {};
  // console.log(videoData);
  return (
    <div className="flex  h-screen w-full">
      {showPopup && <PopupMsg message={message} />}
      <div className="bg-[#1E201E]   sm:pl-[10vw]    flex-1 overflow-auto    text-white">
        {ProcessLoading && <div className="w-full processLoader"></div>}

        {loggedInUser !== null ? (
          <div className="  p-2 sm:flex  gap-3">
            <div className="  sm:w-[54vw] sm:h-[80vh]  ">
              <video
                src={videoData.video}
                width="600"
                height="300"
                controls="controls"
                autoPlay="true"
                className=" rounded-md shadow-xl shadow-zinc-700  "
              />
              <div>
                <p className="text-white sm:text-2xl text-xl sm:m-3">
                  {videoData.title}
                </p>
              </div>

              <div className="flex gap-2 items-center sm:m-3    ">
                <div className="flex gap-2  w-1/2 ">
                  <img
                    src={ownerDetail.avatar}
                    alt=""
                    className="sm:w-12 sm:h-12 w-9 h-9 rounded-full "
                  />
                  <div>
                    <h1 className="sm:text-xl text-sm">
                      {" "}
                      {ownerDetail.username}
                    </h1>
                    <h3 className="sm:text-sm text-xs">
                      {videoData.totalSubscribers} subscribers{" "}
                    </h3>
                  </div>
                </div>
                <div className="  flex justify-end items-center gap-2   w-full ">
                  <div
                    onClick={() => handleSubscribe(ownerDetail._id)}
                    className="w-1/3"
                  >
                    {ownerDetail._id !== loggedInUser._id ? (
                      !subscribe ? (
                        <div className="flex justify-around sm:text-sm text-[9px] border-2 border-zinc-500 rounded-full sm:p-1 ">
                          <TbBell size={20} />
                          <span className=" sm:text-sm text-[9px]">
                            Subscribe
                          </span>
                        </div>
                      ) : (
                        <div className="flex justify-around sm:text-sm text-[9px] bg-white text-black  border-2  border-zinc-500 rounded-full sm:p-1">
                          <TbBellRinging size={20} />
                          <span>Subscribed</span>
                        </div>
                      )
                    ) : null}
                  </div>
                  <div
                    onClick={() => handleLike(videoId)}
                    className="flex items-center justify-center gap-2 sm:text-sm text-[9px] w-1/3 border-2 border-zinc-500 rounded-full sm:p-1"
                  >
                    {like ? (
                      <AiFillLike size={20} />
                    ) : (
                      <AiOutlineLike size={20} />
                    )}
                    <span className="sm:text-sm text-[9px]">
                      {videoData.likeCount} Like
                    </span>
                  </div>

                  <div className="relative w-1/3">
                    <div
                      className="w-full border-2 border-zinc-500  rounded-full sm:p-1 flex items-center justify-center gap-2   cursor-pointer hover:bg-gray-700"
                      onClick={() => {
                        fetchPlaylists();
                        setIsMenuVisible(!isMenuVisible);
                        setIsPlaylistFormVisible(false);
                      }}
                    >
                      <MdOutlinePlaylistAdd size={20} />
                      <span className="sm:text-sm text-[9px]">Save</span>
                    </div>

                    {/* Dropdown Menu */}
                    {isMenuVisible && (
                      <div className="absolute w-full mt-2 bg-gray-800 border border-gray-400 rounded-xl shadow-lg z-10">
                        <ul className="flex flex-col  p-2 text-white">
                          {playlists.length > 0 &&
                            playlists.map((item, index) => (
                              <li
                                key={index}
                                className="hover:bg-gray-700 p-1 text-xs rounded-lg"
                                onClick={() => addVideoToPlaylist(item._id)}
                              >
                                {item.name}
                              </li>
                            ))}
                          <li
                            className="hover:bg-gray-700  rounded-lg text-center p-1 font-semibold text-xs cursor-pointer"
                            onClick={() => {
                              setIsPlaylistFormVisible(!isPlaylistFormVisible);
                              setIsMenuVisible(false);
                            }}
                          >
                            + Create new playlist
                          </li>
                        </ul>
                      </div>
                    )}

                    {/* Playlist Form */}
                    {isPlaylistFormVisible && (
                      <div className="absolute w-full mt-2 bg-zinc-700 border border-gray-600 rounded-xl shadow-lg z-10 p-4">
                        <form
                          onSubmit={handleCreatePlaylist}
                          className="flex flex-col gap-2"
                        >
                          <input
                            className="bg-zinc-700 text-white border-b border-zinc-300 p-2 outline-none"
                            type="text"
                            placeholder="Enter playlist name"
                            name="name"
                          />
                          <button
                            className="bg-white text-black p-2 rounded-xl font-semibold"
                            type="submit"
                          >
                            Create
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-zinc-800 px-2">

              <div className="flex justify-between items-center   ">
                <p className="text-white text-md  "> 
                  Description
                </p>
                <div>
                  <button
                    onClick={() => setIsDescOpen(!isDescOpen)}
                    className="w-full text-left text-5xl  text-zinc-400   rounded focus:outline-none"
                  >
                    {isDescOpen ?
                    <RiArrowDropUpLine/>
                    
                      : 
                    <RiArrowDropDownLine/>
                  }
                  </button>
                </div>
              </div>
              <div
                className={`overflow-hidden transition-max-height duration-100 ease-in-out ${
                  isDescOpen ? "max-h-screen" : "max-h-0"
                }`}
              >
                <p className=" p-2">
                 {videoData.description}
                </p>
              </div>
              </div>
            </div>

            <div className="bg-zinc-800 rounded-xl sm:p-3 sm:w-1/2 p-1  h-auto ml-auto">
              <h1 className="sm:text-2xl text-xl m-2 ">Comments</h1>
              <div>
                <form
                  action="post"
                  onSubmit={handleNewComment}
                  className="flex "
                >
                  <input
                    type="text"
                    name="comment"
                    placeholder="Add comment"
                    autocomplete="off"
                    className="bg-zinc-800 sm:m-2 m-2 sm:text-lg text-xs border-b-2 border-zinc-600 w-full outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-zinc-600 text-white m-2 p-2 rounded-md  "
                  >
                    Post
                  </button>
                </form>
              </div>

              <div>
                {docs.map((comment, index) => (
                  <div key={index} className="p-3 flex gap-2 items-center">
                    <img
                      src={comment.owner.avatar}
                      alt=""
                      className="sm:w-10 sm:h-10 w-8 h-8 rounded-full "
                    />
                    <div className="flex justify-between w-full items-center">
                      <div>
                        <h1 className="text-zinc-400 sm:text-sm text-xs">
                          {comment.owner.username}
                        </h1>
                        <p className="sm:text-lg text-sm">{comment.content}</p>
                      </div>
                      <div className="flex items-start gap-2 ">
                        <div
                          className=""
                          onClick={() => handleCommentLike(comment._id)}
                        >
                          {comment.isLikedByUser ? (
                            <FaHeart size={20} className="text-red-500 " />
                          ) : (
                            <FaRegHeart size={20} className="text-xs " />
                          )}

                          <p className="sm:text-xs text-[10px]">
                            {comment.likesCount} likes
                          </p>
                        </div>
                        <p className="sm:text-xl text-sm">
                          {checkUserComment(comment.owner._id) ? (
                            <AiOutlineDelete
                              size={25}
                              className="hover:text-red-600 "
                              onClick={() => deleteComment(comment._id)}
                            />
                          ) : null}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full w-full flex justify-center items-center text-3xl font-semibold">
            Log in to watch video
          </div>
        )}
      </div>
    </div>
  );
}

export default Video;
