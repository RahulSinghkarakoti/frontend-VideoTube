import axios from "axios";
import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import DragAndDropFileUpload from "../components/DragAndDrop";
import Loader from "../components/Loader/Loader";
import { register } from "../api/userServices";
import PopupMsg from "../components/PopupMsg";

function Signup() {
  const [username, setUsername] = useState("rahul");
  const [fullname, setFullname] = useState("karakoti");
  const [email, setEmail] = useState("rsk@gmail.com");
  const [password, setPassword] = useState("mm");
  const [confirmPassword, setConfirmPassword] = useState("mm");
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // const userData = useSelector((state) => state.auth.userData);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAvatarFileUpload = (file) => {
    setAvatar(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(username, fullname, email, password, confirmPassword, avatar);
    if (confirmPassword !== password) {
      setError("Password not matched");
      return;
    }
    // console.log(avatar)
    if (!avatar) {
      console.log("no avatar");
      setError("Please select an avatar");
      return;
    }
    // if (!error) {
    // console.log(error);
    setError("");
    // setLoading(true)
    uploadData();
    // }
  };

  const uploadData = async () => {
    console.log("uploade data");
    const formData = new FormData();
    formData.append("username", username);
    formData.append("fullname", fullname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);
    formData.append("coverImage", coverImage);


    try {
      // setLoading(true)
      const response = await register(formData);
      const { user, refreshToken, createdUser } = response.data;
      localStorage.setItem("accessToken", user);
      localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("loginstatus", true);

      if (response) dispatch(authLogin(createdUser));
      setLoading(false)
      navigate('/')
    } 
    catch (error) {
      console.log("error occur in uploadedata")
      if (error.response) {
        if (error.response.status === 409) {
          setError("User already exist");
        }
        if (error.response.status === 402) {
          setError("avatar required");
        }
      } else {
        // Handle unexpected errors (e.g., network error)
        setError("An unexpected error occurred.");
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center bg-zinc-900 w-full h-[95vh]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-[#292828] w-full sm:h-[100%] h-[85vh]  flex justify-center items-center ">
      
      <div
        style={{ boxShadow: "-20px -20px 26px #1f1e1e,20px 20px 26px #333232" }}
        className="bg-[#292828] sm:w-2/4 w-[85%] m-5 border-b-2 border-zinc-200 rounded-2xl p-2"
      >
        <h1 className="text-center sm:text-3xl text-xl font-extrabold text-white">
          Register
        </h1>
        {error && (
          <PopupMsg message={error} status={false}/>
          // <div className="flex items-center justify-center">
          //   <p className="text-center  text-white bg-red-500 m-2 p-2 rounded-xl w-fit">
          //     {error}
          //   </p>
          // </div>
        )}
        <form action="post" onSubmit={handleSubmit} className="">
          <div className="flex flex-col  border-2 border-dashed border-white rounded-xl bg-zinc-700   items-center justify-center m-2 p-1">
            <DragAndDropFileUpload onFileUpload={handleAvatarFileUpload} />
            {avatar && (
              <div className="mt-4">
                <p className="text-gray-700 "> {avatar.name}</p>
              </div>
            )}
            <h1 className="text-[15px] font-semibold mb-4 text-center text-zinc-900">
              Upload avatar Image
            </h1>
          </div>
          <div className="flex  justify-around items-center gap-2">
            <div className="  w-1/2">
              <label
                htmlFor="username"
                className="text-zinc-200 sm:text-sm text-[10px]"
              >
                Username:
              </label>
              <br />
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                id="username"
                name="username"
                required
                className="border-b-2 border-[#b7b3b3] outline-green-500    p-1 w-full  bg-[#292828] text-zinc-300"
              />
            </div>
            <div className="  w-1/2">
              <label
                htmlFor="fullname"
                className="text-zinc-200 sm:text-sm text-[10px]"
              >
                FullName:
              </label>
              <input
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                type="text"
                id="fullname"
                name="fullname"
                required
                className="border-b-2 border-[#b7b3b3] outline-green-500    p-1 w-full  bg-[#292828] text-zinc-300"
              />
            </div>
          </div>
          <div className="flex  justify-around items-center gap-2">
            <div className="  w-1/2">
              <label
                htmlFor="email"
                className="text-zinc-200 sm:text-sm text-[10px]"
              >
                Email:
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                name="email"
                required
                className="border-b-2 border-[#b7b3b3] outline-green-500    p-1 w-full  bg-[#292828] text-zinc-300"
              />
            </div>
            <div className="  w-1/2">
              <label
                htmlFor="cover"
                className="text-zinc-200 sm:text-sm text-[10px]"
              >
                Upload cover image:
              </label>
              <input
                onChange={(e) => setCoverImage(e.target.files[0])}
                type="file"
                id="cover"
                name="cover"
                className="border-b-2 border-[#b7b3b3] outline-green-500    p-1 w-full  bg-[#292828] text-zinc-300 text-xs"
              />
            </div>
          </div>
          <div className="flex  justify-around items-center gap-2">
            <div className="  w-1/2">
              <label
                htmlFor="password"
                className="text-zinc-200 sm:text-sm text-[10px]"
              >
                Password:
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                name="password"
                required
                className="border-b-2 border-[#b7b3b3] outline-green-500    p-1 w-full  bg-[#292828] text-zinc-300"
              />
            </div>
            <div className="  w-1/2">
              <label
                htmlFor="cnf_password"
                className="text-zinc-200 sm:text-sm text-[10px]"
              >
                Confirm Password:
              </label>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                id="cnf_password"
                name="cnf_password"
                required
                className="border-b-2 border-[#b7b3b3] outline-green-500    p-1 w-full  bg-[#292828] text-zinc-300"
              />
            </div>
          </div>

          <div className="flex justify-center items-center  p-2">
            <button
              type="submit"
              className="bg-blue-600 p-2 text-white  font-semibold rounded-xl"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
