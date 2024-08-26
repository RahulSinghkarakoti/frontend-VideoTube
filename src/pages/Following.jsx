import React, { useEffect, useState } from "react";
import thumbnail from "../img/image.png";
import { getSubscribedChannel } from "../api/subscription";
import { useSelector } from "react-redux";

function Following() {
  const [followers, setFollowers] = useState();
  const userData = useSelector((state) => state.auth.userData);

  const getFollowers = async () => {
    const response = await getSubscribedChannel(userData._id);
    console.log(response)
    setFollowers(response.data);
  };

  useEffect(() => {
    getFollowers();
  }, [userData]);

  // console.log(followers);

  return (
    <div className="flex h-screen w-full">
      <div className="bg-zinc-900  sm:pl-[10vw]   scrollbar-hide  flex-1 overflow-auto">
        <div className="h-full   text-white p-2">
          <h1 className="text-3xl font-semibold">Following:</h1>
          <div className=" p-2 flex flex-wrap  gap-2">
            {
              followers.map((item) => (
                <div className="bg-zinc-700 p-2 sm:w-1/3  rounded-xl flex items-center gap-2  ">
                  <img
                    src={item.subscribedChannel.avatar}
                    alt=""
                    className="  p-1  w-16 h-16 rounded-full border-2 border-red-600"
                  />
                  <div>
                    <p className="text-2xl text-zinc-300">
                      {item.subscribedChannel.username} 
                    </p>
                    <p></p>
                      <div className=" w-40 text-center bg-red-400 rounded-xl">
                        Following
                      </div> 
                  </div>
                </div>
              ))
               
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Following;
