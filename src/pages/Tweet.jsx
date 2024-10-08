import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { IoAddCircle } from "react-icons/io5";
import thumbnail from "../img/image.png";
import { FaRegHeart } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Loader, TweetCard } from "../components";
import { RxCross2 } from "react-icons/rx";
import {
  createTweet,
  deleteTweet,
  getAllTweets,
  updataTweet,
} from "../api/tweetServices";
import PopupMsg from "../components/PopupMsg";
import { useSelector } from "react-redux";
import { toggleTweetLike } from "../api/likeService";
import "../components/Loader/LineLoader.css";
function Tweet() {
  const [addTweetForm, setAddTweetForm] = useState(false);
  const [updateTweetForm, setUpdateTweetForm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const userData = useSelector((state) => state.auth.userData);
  const [tweets, setTweets] = useState(null);
  const [loading, setLoading] = useState(false);

  const [ProcessLoading, setProcessLoading] = useState(false);
  const [prevTweet, setPrevTweet] = useState({ content: "",_id:""});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.get("content");
    try {
      const response = await createTweet(formData);
      console.log(response);
      setMessage("tweet posted successfully");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        setMessage("");
      }, 2000);
      fetchTweets();
      setAddTweetForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTweets = async () => {
    try {
      const response = await getAllTweets();
      console.log(response.data);
      setTweets(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleLike = async (_id) => {
    try {
      const response = await toggleTweetLike(_id);
      console.log(response);
      setTweets(
        tweets.map((tweet) =>
          tweet._id === _id ? { ...tweet, isLiked: !tweet.isLiked } : tweet
        )
      );
      fetchTweets();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDelete = async (_id) => {
    console.log("in delete .. page");

    try {
      setProcessLoading(true);
      const response = await deleteTweet(_id);
      console.log(response);
      fetchTweets();
      setProcessLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.get("content");
    console.log(formData.get("content"));
    try {
      const response = await updataTweet(prevTweet._id, formData);
      console.log(response);
      setMessage("tweet updated successfully");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        setMessage("");
      }, 2000);
      fetchTweets();
      setUpdateTweetForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleUpdate = async (_id, content) => {
    console.log(_id, content);
    setPrevTweet({ _id:_id, content:content });
    setUpdateTweetForm(true);
  };
  

  const handleChange = (e) => {
    setPrevTweet({
      ...prevTweet,
      content: e.target.value,
    });
  };

  useEffect(() => {
    setLoading(true);
    fetchTweets();
  }, []);

  if (loading)
    return (
      <div className="flex h-screen w-full ">
        <div className="bg-zinc-900    sm:pl-[10vw]   flex items-center justify-center     flex-1 overflow-auto">
          <Loader />
        </div>
      </div>
    );

  return (
    <div className="flex h-screen w-full">
      {showPopup && <PopupMsg message={message} />}
      <div className="bg-zinc-900  sm:pl-[10vw]   scrollbar-hide  flex-1 overflow-auto">
        {ProcessLoading && <div className="w-full processLoader"></div>}
        <div className="h-full  text-black  p-2">
          {addTweetForm ? (
            <div className=" sm:w-[87vw] w-full  h-full z-50    @apply backdrop-blur-lg backdrop-saturate-[180%] bg-[rgba(26,17,40,0.75)]   rounded-xl  -webkit-backdrop-filter: blur(16px) saturate(180%); absolute   flex flex-col   items-center sm:justify-start justify-center  sm:p-10 p-2">
                  <h1 className="text-3xl font-bold text-white">New Tweet:</h1>

              <div className="bg-zinc-600 rounded-xl p-2 ">
                <div className="w-full     flex justify-end">
                  <RxCross2
                    onClick={() => setAddTweetForm((prev) => !prev)}
                    className="w-6 h-6 p-1    bg-zinc-700 rounded-full text-white"
                  />
                </div>
                <form
                  action="post"
                  onSubmit={handleSubmit}
                  className="   top-1/2 right-48 p-3 flex flex-col gap-2  "
                >
                  <div>
                    <textarea
                      name="content"
                      id="desc"
                      placeholder="Enter Your Thought"
                      className="bg-zinc-700 text-white sm:text-xl text-sm p-2 rounded-xl sm:w-96 h-60 resize-none"
                    ></textarea>
                  </div>
                  <div className="">
                    <button
                      type="submit"
                      className="bg-zinc-700 flex items-center justify-between text-white p-2 rounded-xl sm:w-1/4 h-10  sm:text-lg hover:bg-blue-400"
                    >
                      Post
                      <IoIosSend className="sm:text-2xl text-lg" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : null}

          {updateTweetForm && (
            <div className=" sm:w-[87vw] w-full  h-full z-50    @apply backdrop-blur-lg backdrop-saturate-[180%] bg-[rgba(26,17,40,0.75)]   rounded-xl  -webkit-backdrop-filter: blur(16px) saturate(180%); absolute   flex flex-col   items-center sm:justify-start justify-center  sm:p-10 p-2">
                  <h1 className="text-3xl font-bold text-white">Update Tweet:</h1>
              <div className="bg-zinc-600 rounded-xl  ">
                <div className="w-full  p-2    flex justify-end">
                  <RxCross2
                    onClick={() => setUpdateTweetForm((prev) => !prev)}
                    className="w-6 h-6 p-1    bg-zinc-700 rounded-full text-white"
                  />
                </div>
                <form
                  onSubmit={handleUpdate}
                  className="   top-1/2 right-48 p-3 flex flex-col gap-2  "
                >
                  <div>
                    <textarea
                      name="content"
                      id="desc"
                      placeholder="enter updated tweet"
                      value={prevTweet.content}
                      onChange={handleChange}
                      className="bg-zinc-700 text-white sm:text-xl text-sm p-2 rounded-xl sm:w-96 h-60 resize-none"
                    ></textarea>
                  </div>
                  <div className="">
                    <button
                      type="submit"
                      className="bg-zinc-700 flex items-center justify-between text-white p-2 rounded-xl sm:w-1/4 h-10  sm:text-lg hover:bg-blue-400"
                    >
                      Post
                      <IoIosSend className="sm:text-2xl text-lg" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-3 gap-4 ">
            <div
              onClick={() => setAddTweetForm(!addTweetForm)}
              className="break-inside-avoid mb-4 p-4 text-white background-animate  bg-gradient-to-r from-green-500   via-violet-500  to-pink-600  rounded-xl "
            >
              <IoAddCircle className="text-5xl" />
              Share Your Thoughts
            </div>

            {tweets
              ? tweets.map((tweet, index) => (
                  <TweetCard
                    key={index}
                    props={tweet}
                    onLike={toggleLike}
                    onDelete={toggleDelete}
                    onUpdate={toggleUpdate}
                  />
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tweet;
