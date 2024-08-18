import React, { useEffect, useState } from "react";
import coverImg from "../img/image.png";
import avatar from "../img/avatar.jpeg";
import { FaBell } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getChannelStats, getChannelVideo } from "../api/userServices";
import { Card } from "../components";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function Channel() {
  const [stats, setStats] = useState({});
  const [channelVideo, setChannelVideo] = useState([]);
  const user = useSelector((state) => state.auth.userData);
  // console.log(user)

  const getStats = async () => {
    try {
      const response = await getChannelStats();
      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getVideo = async () => {
    try {
      const response = await getChannelVideo();
      setChannelVideo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStats();
    getVideo();
  }, []);

  console.log(stats);
  console.log(channelVideo);

  {
    channelVideo.map((video, index) => {
      console.log(video.thumbnail);
      console.log(video.title);
    });
  }

  return (
    <div className="flex h-screen w-full ">
      <div className="bg-zinc-900    sm:pl-[10vw]      flex-1 overflow-auto">
        <div className="   text-white p-2 bg-zinc-800 m-2 rounded-xl  ">
          <img
            src={user?.coverImage || coverImg}
            alt="coverImg"
            className="w-full sm:h-52 h-full  rounded-xl"
          />
          <div className="flex gap-3 m-2 sm:h-32   border-b-2 border-zinc-500">
            <img
              src={user?.avatar || avatar}
              alt="coverImg"
              className="sm:w-40 w-20 sm:h-40  h-20   bg-black  border-4 border-green-600  rounded-full  sm:-top-14 -top-10 relative"
            />
            <div className="m-2 w-full flex justify-between   ">
              <div className=" flex  flex-col h-2/3 justify-between">
                <h1 className="  sm:text-3xl text-sm font-semibold">
                  {" "}
                  {user?.username || "channelname"}
                </h1>
                <div className="flex sm:gap-3 gap-1 sm:text-sm text-zinc-300 text-[10px]">
                  <p className="bg-zinc-700 rounded-2xl text-gray-300 px-2">
                    {stats.totalSubscribers} Followers
                  </p>
                  <p className="bg-zinc-700 rounded-2xl text-gray-300 px-2">
                    0 Following
                  </p>
                  <p className="bg-zinc-700 rounded-2xl text-gray-300 px-2">
                    {stats.totalLikes} Likes
                  </p>
                  <p className="bg-zinc-700 rounded-2xl text-gray-300 px-2">
                    {stats.totalVideo} Video
                  </p>
                  <p className="bg-zinc-700 rounded-2xl text-gray-300 px-2">
                    {stats.totalViews} Views
                  </p>
                </div>
              </div>
              <div className="h-full flex sm:flex-col justify-around items-center">
                <Link to="/followers">
                  <div className="flex gap-2 bg-gray-400 font-semibold   text-gray-900  p-1 rounded-xl ">
                    <h1 className="text-xl">Followers</h1>
                    <FaExternalLinkAlt size={20} />
                  </div>
                </Link>
                <Link to="/following">
                <div className="flex gap-2 bg-gray-400 font-semibold   text-gray-900  p-1 rounded-xl ">
                  <h1 className="text-xl">Following</h1>
                  <FaExternalLinkAlt size={20} />
                </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="p-2 flex flex-wrap gap-2    ">
          {channelVideo.length > 0 ? (
            <div className="   flex-1 overflow-auto">
              <div className="p-2 flex flex-wrap gap-3 ">
                {channelVideo.map((video, index) => (
                  <Card
                    key={index}
                    thumbnail={video.thumbnail}
                    title={video.title}
                    avatar={user.avatar}
                    views={video.views}
                    channel={user.username}
                    props={video}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-white pl-[90px]   text-5xl   w-full flex justify-center items-center ">
              <h2>can't find the videos </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Channel;
