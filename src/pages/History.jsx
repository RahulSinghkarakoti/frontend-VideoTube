import React from 'react'
import { getHistoryVideo } from '../api/userServices';
import Loader from '../components/Loader/Loader';
import { useState,useEffect } from 'react';
import { Card, SkeletonCard } from '../components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function History() {

  const [historyVideos, setHistoryVideos] = useState([]);
  const [loading,setLoading]=useState(false)
  // console.log(token)

  const navigate=useNavigate()

  const loginStatus =  localStorage.getItem("loginstatus");


  useEffect(() => {
    if (!loginStatus) {
      alert("Please log in first");
      navigate("/auth/login");
    }
  }, [loginStatus, navigate]);


  useEffect(()=>{
    const fetchLikedVideo=async()=>{
      try {
        setLoading(true)
        const data=await getHistoryVideo()
        console.log(data)
        setHistoryVideos(data.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    };
    fetchLikedVideo();
  },[])

  console.log(historyVideos)
   

 if (loading)
    return (
      <div className="  h-screen w-full  p-1  bg-black text-white flex justify-between">
        <div className="bg-zinc-900   sm:pl-[10vw]     flex-1 overflow-auto">
        <h1 className="text-4xl p-2 font-semibold">History :</h1>

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
    {
      historyVideos.length > 0 ? (
        <div className="bg-zinc-900    sm:pl-[10vw]    flex-1 overflow-auto">
          <h1 className="text-4xl p-2 font-semibold">History :</h1>
      <div className="p-2 flex flex-wrap gap-3 ">
      {
        historyVideos.map((video, index) => (
          <Card
          key={index}
          thumbnail={video.thumbnail}
          title={video.title}
          avatar={video.owner.avatar}
          views={video.views}
          channel={video.owner.username}
          props={video}
          />
        ))
      }
      </div>
    </div>
      ):
      <div  className="text-white pl-[90px] bg-black text-5xl   w-full flex justify-center items-center ">
      <h2>can't find the videos </h2>
    </div>
    }
    
     
   
  </div>
  )
}

export default History
