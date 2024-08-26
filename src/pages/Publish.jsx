import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DragAndDropFileUpload from "../components/DragAndDrop";
import { uploadeVideo } from "../api/videoService";
import Loader from "../components/Loader/Loader";
import "../components/Loader/LineLoader.css";

function Publish() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [popUpMessage, setPopUpMessage] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const navigate=useNavigate()

  const handleVideoUpload = (file) => {
    setVideo(file);
  };
  const handleThumbnailUpload = (file) => {
    setThumbnail(file);
  }; 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || title.length < 10) {
      setPopUpMessage("Title should be more then 10 charecter");
      setShowPopup(true);
    } else if (!description || description.length < 20) {
      setPopUpMessage("Description should be more then 20 charecter");
      setShowPopup(true);
    } else if (!video) {
      setPopUpMessage("Video required");
      setShowPopup(true);
    } else if (!thumbnail) {
      setPopUpMessage("Thumbnail required");
      setShowPopup(true);
    } else {
      setPopUpMessage(null);
      setShowPopup(false);
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("video", video);
      formData.append("thumbnail", thumbnail);
      // console.log(formData)
      handleUpload(formData);
    }
    setTimeout(() => {
      setPopUpMessage("")
      setShowPopup(false);
    }, 2000);
  };

  const handleUpload = async (formData) => {
  try {
      const response = await uploadeVideo(formData);
      console.log(response)
      if (response.statusCode === 200 ) {
        console.log("done done ")
        setSuccess("Video uploaded successfully");
        setLoading(false);
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          navigate("/")
        }, 2000); 
      }
  } catch (error) {
    setLoading(false)
    console.error(error)
    console.log(error.response.status) 
    if(error.response.status===402){
      setPopUpMessage("Title and Description already exists")
      setShowPopup(true);
      
    }
    else if(error.response.status === 500)
    {
      setPopUpMessage("Internal Server Error")
      setShowPopup(true);

    }
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  }
  };

  // if(loading){
  //   return <div className="flex justify-center items-center bg-zinc-900 w-full h-[95vh]">
  //     <Loader/>
  //   </div>
  // }

  return (
    <div className="flex  sm:h-[88vh] h-full  w-full">
      <div className="bg-zinc-900   sm:pl-[10vw]    flex-1 overflow-auto    text-white">
      {loading && <div className="w-full processLoader"></div>}

        <div className="  sm:p-2 flex sm:flex-row flex-col    sm:justify-between gap-3 h-full ">
          <div className="  h-[10%] sm:hidden block text-xl p-2  font-extrabold text-zinc-200 ">
            Your Stage Awaits: Upload Your Masterpiece
          </div>
          <div className=" sm:w-[60%] flex sm:flex-col sm:order-1 order-2  justify-between">
            <div className="  h-[10%] sm:block hidden text-2xl font-extrabold text-zinc-200 ">
              Your Stage Awaits: Upload Your Masterpiece
            </div>
            <div className="bg-zinc-800 rounded-xl h-[90%] w-full  sm:p-2 m-2">
              <form
                action="post"
                onSubmit={handleSubmit}
                className="p-2  h-full"
              >
                <div className=" flex flex-col gap-5">
                  <div className="flex  flex-col gap-2">
                    <label
                      htmlFor="title"
                      className="sm:text-xl text-md font-semibold "
                    >
                      Title:
                    </label>
                    <input
                      type="text"
                      className="w-2/3 h-8 bg-zinc-800 border-b-2 border-white outline-none "
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="flex  flex-col gap-2">
                    <label
                      htmlFor="title"
                      className="sm:text-xl text-md font-semibold"
                    >
                      Description:
                    </label>
                    <textarea
                      name="description"
                      id="desc"
                      className="h-40 resize-none  outline-none bg-zinc-700 rounded-lg p-2"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="flex justify-between items-center py-3 ">
                  <div className="w-1/2 flex  items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <label htmlFor="tnc" className="sm:text-md text-xs">
                      I agree to the
                      <a
                        href="https://www.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 sm:text-md text-xs"
                      >
                        {" "}
                        Terms & Conditions
                      </a>
                    </label>
                  </div>
                  <button className="bg-white outline-none hover:bg-blue-400 hover:text-white text-black font-semibold rounded-xl sm:w-32 w-1/3 p-2 m-2">
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className=" sm:w-[40%] flex flex-col sm:order-2 order-1 justify-between">
            <div className="bg-zinc-600 rounded-xl h-1/2  p-2 m-2">
              <div className=" border-2 border-dashed border-white rounded-xl flex  flex-col justify-center items-center h-full font-semibold sm:text-xl text-sm">
                <DragAndDropFileUpload onFileUpload={handleVideoUpload} />
                <h1 className="relative mb-2">Upload Video File Here</h1>
              </div>
            </div>
            <div className="bg-zinc-600 rounded-xl h-1/2 p-2 m-2">
              <div className="border-2 border-dashed border-white rounded-xl flex  flex-col justify-center items-center h-full font-semibold sm:text-xl text-sm">
                <DragAndDropFileUpload onFileUpload={handleThumbnailUpload} />
                <h1 className="relative mb-2">
                  Upload Video Thumbnail File Here
                </h1>
              </div>
            </div>
          </div>
        </div>
        {showPopup && (
          <div className="fixed top-20 right-1/2 p-4 bg-red-500 text-white rounded shadow-lg transition-opacity duration-2000 opacity-100">
            {popUpMessage}
          </div>
        )}
          {showPopup &&  (
          <div className="fixed top-20 right-1/2  p-4 bg-green-500 text-white rounded shadow-lg transition-opacity duration-2000 opacity-100">
            {success}
          </div>
        )}
      </div>
    </div>
  );
}

export default Publish;
