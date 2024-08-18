import React from 'react'
import Navbar from "../components/navbar/Navbar";
import { Outlet } from 'react-router-dom';
function Auth() {
  return (
       <div>
      <Navbar />
      <div className="flex ">
          <Outlet />
      </div>
    </div>
  )
}

export default Auth
