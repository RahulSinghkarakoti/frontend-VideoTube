import React, { useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Sidebar } from "./components";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "./store/authSlice";
import { getCurrentUser } from "./api/userServices";


function App() {

  // axios.defaults.baseURL = 'http://localhost:8000/api/v1';

  const dispatch=useDispatch()

  useEffect(()=>{
    const fetchCurrentUser=async()=>{
      try {
        const data=await getCurrentUser()
        dispatch(login(data.data))
      } catch (error) {
        console.log(error)
      }
    };
    fetchCurrentUser();
  },[])


  return (
    <div>
      <Navbar />
      <div className="flex ">
        <div className=" sm:w-[10vw] w-[20vw]    fixed ">
          <Sidebar />
        </div>
          <Outlet  />
      </div>
    </div>
  );
}

export default App;
