import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { PiVideoFill } from "react-icons/pi";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { getCurrentUser } from "../../api/userServices";
import { login, logout } from "../../store/authSlice";



function Navbar() {
  const navigate = useNavigate();
  // const userStatus = useSelector((state) => state.auth.status);
  // const userData = useSelector((state) => state.auth.userData);
  const dispatch=useDispatch()
  const [user, setUser] = useState(null);
  
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  // const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const handleLogout = () => {
    console.log("logout") 
    localStorage.clear()

    // setIsUserLoggedIn(false);
    setPopupMessage('Logout successful!');
    setShowPopup(true);
    dispatch(logout)
    setTimeout(() => {
      setShowPopup(false);
      navigate('/')
      window.location.reload();
    }, 1000); 

  };

 
  useEffect(()=>{
    const fetchCurrentUser=async()=>{
      try {
        const data=await getCurrentUser()
        setUser(data.data)
        dispatch(login(data.data))
      } catch (error) {
        console.log(error)
      }
    };
    fetchCurrentUser();
  },[])


  return (
    <div className="p-2  bg-black text-white flex justify-between sticky top-0 z-10">
      <Link to={"/"}>

        <PiVideoFill  className="text-white sm:text-5xl text-4xl hover:text-red-500 sm:ml-5 ml-2" />
      </Link>
      <div className="  ">
        <div>
          {user ? (
            <div className="  flex items-center gap-4">
              <div className="flex  gap-2 ">
                <img
                  src={user.avatar}
                  alt=""
                  className="w-10 h-10 rounded-full  border-2 border-green-300  p-1"
                />
                <h4>{user.username}</h4>
              </div>
              <div className="text-black ">
                <button
                  onClick={handleLogout}
                  className="text-white sm:text-xl text-sm p-2 hover:bg-red-600 rounded-full border-2 border-zinc-400"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="text-2xl flex gap-2 justify-between sm:w-48 w-36">
              <button
                className="border-2 border-white rounded-full p-1 sm:text-xl text-sm  w-1/2 shadow-md hover:shadow-green-400"
                onClick={() => navigate("/auth/login")}
              >
                LogIn
              </button>
              <button
                className="border-2 border-white rounded-full bg-white text-black   p-1 sm:text-xl text-sm w-1/2 shadow-md hover:shadow-blue-400"
                onClick={() => navigate("/auth/signup")}
              >
                SignUp
              </button>
            </div>
          )}
        </div>
        {showPopup && (
        <div className="fixed bottom-4 right-4 p-4 bg-red-500 text-white rounded shadow-lg transition-opacity duration-2000 opacity-100">
          {popupMessage}
        </div>
      )}
      </div>
    </div>
  );
}

export default Navbar;
