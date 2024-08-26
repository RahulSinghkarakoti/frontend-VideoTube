import React, { useEffect, useState } from "react";
import { Card, SkeletonCard } from "../components/index";
import { getHomeVideo } from "../api/videoService";
import Loader from "../components/Loader/Loader";
import { IoAddCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Import icons 

function Home() {
  const [homeVideos, setHomeVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const loginStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  console.log("loginstatus : ", loginStatus);
 
  function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("hidden");
  }
  

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const video = await getHomeVideo();
        setHomeVideos(video.message.data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, []);

  const goToPublish = () => {
    console.log("all good ");
    if (loginStatus) {
      navigate("/publish");
    } else {
      alert("Please login to publish a video");
    }
  };

  if (loading)
    return (
      <div className=" sm:h-full  w-full   bg-black text-white flex justify-between">
        <div className="bg-zinc-900   sm:pl-[10vw]     flex-1 overflow-auto">
          <div className="p-2 flex  flex-wrap gap-3 ">
            {Array.from({ length: 12 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
            {/* <SkeletonCard/> */}
          </div>
        </div>
      </div>
    );

  return (
    <div className="  h-screen w-full  p-1  bg-black text-white flex justify-between">
      <div className="bg-zinc-900  sm:pl-[10vw]   scrollbar-hide  flex-1 overflow-auto">
        <div className="w-full h-32 p-2 ">
          <div className="  flex justify-between items-center sm:px-10 background-animate w-full h-full bg-gradient-to-r from-green-500   via-violet-500  to-pink-600 rounded-xl p-2">
            <div className="flex flex-col  justify-center">
              <h1 className="sm:text-3xl text-md font-semibold">
                Lights, Camera, Upload!{" "}
              </h1>
              <h1 className="sm:text-xl text-xs ">
                {" "}
                Share Your New Video Adventure
              </h1>
            </div>
            <div onClick={() => goToPublish()}>
              <IoAddCircle className="text-5xl" />
            </div>
          </div>
        </div> 

        <div className="p-2 flex  flex-wrap gap-3 ">
          {homeVideos.length > 0 ? (
            homeVideos.map((video, index) => (
              <Card
                key={index}
                props={video}
                thumbnail={video.thumbnail}
                title={video.title}
                views={video.views}
                avatar={video.ownerDetail.avatar}
                channel={video.ownerDetail.username}
              />
            ))
          ) : (
            <p>no video uploaded </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
