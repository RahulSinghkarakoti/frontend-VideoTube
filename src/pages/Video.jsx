import React, { useEffect, useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { getVideo, updateVideoView } from "../api/videoService";

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

function Video() {
  const location = useLocation();
  const { videoId } = location.state || {};
  const [videoData, setVideoData] = useState({});
  const [like, setLike] = useState(false);
  const [comments, setComments] = useState({});
  const docs = comments?.docs || [];
  const loggedInUser = useSelector((state) => state.auth.userData);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isPlaylistFormVisible, setIsPlaylistFormVisible] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  const fetchPlaylists = async () => {
    console.log("fetching playlists");
    try {
      const response = await getUserPlaylists(loggedInUser._id);

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
        const response = await deleteVideoComment(commentId);
        if (response.success) {
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
    const formData = new FormData(e.target);
    const comment = formData.get("comment");
    addComment(formData);
    e.target.reset();
  }

  const addComment = async (formData) => {
    try {
      const response = await addVideoComment(videoId, formData);
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

  useEffect(() => {
    fetchVideo();
    fetchComment();
  }, [videoId]);

  const ownerDetail = videoData.ownerDetail || {};
  console.log(playlists);
  return (
    <div className="flex  h-screen w-full">
      {showPopup && <PopupMsg message={message} />}
      <div className="bg-[#1E201E]   sm:pl-[10vw]    flex-1 overflow-auto    text-white">
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

              <div className="flex justify-between items-center sm:m-3   ">
                <div className="flex gap-2 w-1/2 ">
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
                    <h3 className="sm:text-sm text-xs">0 subscribers </h3>
                  </div>
                </div>
                <div className=" m-2 flex justify-end items-center  gap-3 w-1/2 ">
                  <div
                    onClick={() => handleLike(videoId)}
                    className="flex items-center justify-center gap-2 sm:text-sm text-[9px] w-1/2 border-2 border-zinc-500 rounded-full sm:p-1"
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

                  <div className="relative w-1/2 max-w-xs">
                    <div
                      className="w-full border-2 border-zinc-500 rounded-full p-2 flex items-center justify-center gap-2   cursor-pointer hover:bg-gray-700"
                      onClick={() => {
                        fetchPlaylists();
                        setIsMenuVisible(!isMenuVisible);
                        setIsPlaylistFormVisible(false);
                      }}
                    >
                      <MdOutlinePlaylistAdd size={20} />
                      <span className="text-sm">Save</span>
                    </div>

                    {/* Dropdown Menu */}
                    {isMenuVisible && (
                      <div className="absolute w-full mt-2 bg-gray-800 border border-gray-400 rounded-xl shadow-lg z-10">
                        <ul className="flex flex-col  p-2 text-white">
                          {playlists.map((item, index) => (
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
              <div>
                <p className="text-white text-md sm:m-3  rounded-xl bg-zinc-800 p-2">
                  {videoData.description}
                </p>
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
