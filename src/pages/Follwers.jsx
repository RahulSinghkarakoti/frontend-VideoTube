import React, { useEffect, useState } from "react";
import thumbnail from "../img/image.png";
import { getSubscribers } from "../api/subscription";
import { useSelector } from "react-redux";

function Subscriber() {
  const [followers, setFollowers] = useState();
  const userData = useSelector((state) => state.auth.userData);

  const getFollowers = async () => {
    const response = await getSubscribers(userData._id);
    setFollowers(response.data);
  };

  useEffect(() => {
    getFollowers();
  }, []);

  console.log(followers);

  return (
    <div className="flex h-screen w-full">
      <div className="bg-zinc-900  sm:pl-[10vw]   scrollbar-hide  flex-1 overflow-auto">
        <div className="h-full   text-white p-2">
          <h1 className="text-3xl font-semibold">Followers:</h1>
          <div className=" p-2 flex flex-wrap  gap-2">
            {followers &&
              followers.map((item) => (
                <div className="bg-zinc-700 p-2 sm:w-1/3  rounded-xl flex items-center gap-2  ">
                  <img
                    src={item.subscriber.avatar}
                    alt=""
                    className="  p-1  w-16 h-16 rounded-full border-2 border-red-600"
                  />
                  <div>
                    <p className="text-2xl text-zinc-300">
                      {item.subscriber.username} 
                    </p>
                    <p></p>
                    {item.subscriber.subscribedToSubscriber ? (
                      <div className=" w-40 text-center bg-red-400 rounded-xl">
                        Following
                      </div>
                    ) : (
                      <div className=" w-40 text-center bg-red-400 rounded-xl">
                        Follow
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subscriber;
