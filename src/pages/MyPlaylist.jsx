import React, { useEffect, useState } from "react";
import { Playlistcard } from "../components";
import { FaFolderPlus } from "react-icons/fa6";
import { createPlaylist, getUserPlaylists } from "../api/playlistService";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

function MyPlaylist() {
  const [playlist, setPlaylist] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const getAllPlaylist = async () => {
    console.log("in get playlist");
    try {
      const response = await getUserPlaylists(userData._id);
      setPlaylist(response.data);
      console.log(response.data)
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getAllPlaylist();
  }, [userData]);

  const handleCreatePlaylist = () => {
    console.log("create playlist");
    setShowCreateForm(true);
  };

  const handleSubmit = async (e) => {
    console.log("submit create playlist");
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.get("name");
    formData.get("description");

    try {
      const response = await createPlaylist(formData);
      console.log(response.data);
      setShowCreateForm(false);
      getAllPlaylist();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full">
        <div className="bg-zinc-900  sm:pl-[10vw]    flex-1 overflow-auto">
          <div className="h-full text-white p-2">
            <h1>Your Playlist :</h1>
            <div className="flex flex-wrap ">
              {Array(5)
                .fill(0)
                .map((item) => {
                  return (
                    <div>
                      <div className="bg-zinc-700    rounded-xl flex flex-col items-center p-2 m-1 text-zinc-400 hover:border-2 border-white">
                        <div className="bg-zinc-400 w-36 h-36 rounded-xl animate-pulse"></div>
                        <h1 className="text-white font-semibold rounded-xl w-20 h-4 mt-2 bg-zinc-400 animate-pulse"></h1>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }



  return (
    <div className="flex h-screen w-full">
      <div className="bg-zinc-900  sm:pl-[10vw]   scrollbar-hide  flex-1 overflow-auto">
        
        <div className="h-full   text-white p-2">
        {  showCreateForm ? (
     
          <div className="  w-[87vw] h-full    @apply backdrop-blur-lg backdrop-saturate-[180%] bg-[rgba(17,25,40,0.75)]   rounded-xl  -webkit-backdrop-filter: blur(16px) saturate(180%); absolute   flex flex-col   items-center justify-center">
            <RxCross2
            onClick={()=>setShowCreateForm(prev=>!prev)}
             className="w-10 h-10 absolute top-0 right-0 " />
            <div className=" ">
              <form
                action="post"
                onSubmit={handleSubmit}
                className="bg-zinc-600   top-1/2 right-48 p-3 flex flex-col gap-2 rounded-xl "
              >
                <div>
                  <input
                    required
                    type="text"
                    name="name"
                    placeholder="Enter Playlist Name*"
                    className="bg-zinc-700 text-white p-2 rounded-xl w-96 h-10"
                  />
                </div>
                <div>
                  <textarea
                    name="description"
                    id="desc"
                    placeholder="Enter description"
                    className="bg-zinc-700 text-white p-2 rounded-xl w-96 h-30 resize-none"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="bg-zinc-700 text-white p-2 rounded-xl  h-10 hover:bg-blue-400"
                  >
                    Create Playlist
                  </button>
                </div>
              </form>
            </div>
          </div> 
  ) : null}
          <>
            <h1 className="text-4xl font-semibold p-2">Your Playlist :</h1>
            <div className="flex flex-wrap ">
              <div onClick={() => handleCreatePlaylist()}>
                <div className="bg-zinc-700    rounded-xl flex flex-col items-center p-2 m-1 text-zinc-400 hover:border-2 border-white">
                  <div>
                    <FaFolderPlus size={140} />
                  </div>
                  <h1 className="text-white font-semibold">
                    Create New Playlist
                  </h1>
                </div>
              </div>
              {playlist.length>0 ?  playlist.map((item, index) => {
                return (
                  <Link to={`/playlist/${item._id}`} key={index}>
                    <Playlistcard name={item.name} props={item} />
                  </Link>
                );
              })
              :
              null
            }
            </div>
          </>
        </div>
      </div>
    </div>
  );
}

export default MyPlaylist;
