import React, { useEffect, useState } from "react";
import { Sidebar, Card, SkeletonCard } from "../components/index";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { getLikedVideo } from "../api/likeService";
import Loader from "../components/Loader/Loader";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function LikedVideo() {
  const [likedVideos, setLikedVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log(token)
  const navigate=useNavigate()

  const loginStatus =  localStorage.getItem("loginstatus");

  useEffect(() => {
    if (!loginStatus) {
      alert("Please log in first");
      navigate("/auth/login");
    }
  }, [loginStatus, navigate]);

  useEffect(() => {
    const fetchLikedVideo = async () => {
      try {
        if (loginStatus) {
          setLoading(true);
          const data = await getLikedVideo();
          // console.log(data.data)
          setLikedVideos(data.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchLikedVideo();
  }, []);

  console.log(likedVideos);

  if (loading)
    return (
      <div className="  h-screen w-full  p-1  bg-black text-white flex justify-between">
        <div className="bg-zinc-900   sm:pl-[10vw]    flex-1 overflow-auto">
        <h1 className="text-4xl p-2 font-semibold">Liked Video :</h1>

          <div className="p-2 flex  flex-wrap gap-3 ">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
            {/* <SkeletonCard/> */}
          </div>
        </div>
      </div>
    );


  return (
    <div className="  h-screen w-full  p-1  bg-black text-white flex justify-between">
      {likedVideos.length > 0 ? (
        <div className="bg-zinc-900     sm:pl-[10vw]    flex-1 overflow-auto">
          <h1 className="text-4xl p-2 font-semibold">Liked Video :</h1>
          <div className="p-2 flex flex-wrap gap-1 ">
            {likedVideos.map((video, index) => (
              <Card
                key={index}
                thumbnail={video.likedVideo.thumbnail}
                title={video.likedVideo.title}
                avatar={video.likedVideo.ownerDetail.avatar}
                views={video.likedVideo.views}
                channel={video.likedVideo.ownerDetail.username}
                props={video.likedVideo}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-white pl-[90px] bg-black text-5xl   w-full flex justify-center items-center ">
          <h2>can't find the videos </h2>
        </div>
      )}
    </div>
  );
}

export default LikedVideo;
