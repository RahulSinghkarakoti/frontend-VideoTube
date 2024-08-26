import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/authSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { login } from "../api/userServices";
import AnimatedContainer from "../components/AnimatedContainer.jsx"
import PopupMsg from "../components/PopupMsg.jsx";


function Login() {
  const [showPopup, setSetShowPopup] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const userData = useSelector((state) => state.auth.userData);

  const [inputs, setInputs] = useState({
    // username: "rahul",
    // password: "mm",
    // email: "rsk@gmail.com",

    //testUser->2
    // username: "rahul123",
    // email: "karakoti@gmail.com",
    // password: "12345mmm",

    "username":"rahul29",
    "email":"rsinghk@gmail.com",
    "password":"mnbvcxz"
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await login(inputs);
        handleLoginSuccess(response.data); 
      } catch (error) { 
         console.log(error.response.status)   
        if(error.response.status){
          setStatus(error.response.status)
          setSetShowPopup(true)
          setTimeout(() => {
            setSetShowPopup(false)
            setStatus("")
          }, 1000);
        }
      }
    };
    fetchUser();
  };

  const handleLoginSuccess = (data) => {
    const { user, refreshToken, loggedInUser } = data;
    console.log("AT:", user);
    console.log("RT:", refreshToken);
    localStorage.setItem("accessToken", user);
    localStorage.setItem("refreshToken", refreshToken);
    console.log(loggedInUser);
    if (loggedInUser) dispatch(authLogin(loggedInUser));
    localStorage.setItem("loginstatus", true);
    setLoading(false);
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center bg-zinc-900 w-full h-[95vh]">
        <Loader />
      </div>
    );
  }

  return (
    
    <div className="flex flex-col   justify-center  items-center w-full bg-[#373535] sm:h-[90vh] h-[85vh] ">
 
      {showPopup ? (
            <div className="  fixed bottom-12 right-4 p-4 bg-red-600 text-white rounded shadow-lg transition-opacity duration-2000 opacity-100">
              {status === 404
                ? "invalid user"
                : status === 401
                ? "wrong password"
                : null}
            </div>
          ) : null}
      <AnimatedContainer reverse={false} direction='vertical' distance={100}>
      <div
        style={{
          boxShadow: "-20px -20px 28px #212121, 20px 20px 28px #373535",
        }}
        className="border-2 relative  border-zinc-400 rounded-2xl m-3  p-3 sm:w-full  text-white "
      >
         
        
        <h1 className="text-3xl text-center   font-semibold">Login Here!</h1>
        <form action="post" onSubmit={(e) => handleLogin(e)} className=" m-2 ">
          <div>
            <label htmlFor="username" className="text-sm">
              Username:
            </label>
            <br />
            <input
              className="border-2 border-[#5b5a5a] rounded-lg  p-1  bg-[#373535]  w-full "
              type="text"
              id="username"
              name="username"
              placeholder="enter username"
              required
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  [e.target.name]: e.target.value,
                })
              }
              value={inputs.username}
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm">
              Email:
            </label>
            <br />
            <input
              className="border-2 border-[#5b5a5a] rounded-lg  p-1 bg-[#373535]  w-full "
              type="email"
              id="email"
              name="email"
              placeholder="enter email"
              required
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  [e.target.name]: e.target.value,
                })
              }
              value={inputs.email}
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm">
              Password:
            </label>
            <br />
            <input
              className="border-2 border-[#5b5a5a] rounded-lg  p-1 bg-[#373535]  w-full "
              type="password"
              id="password"
              name="password"
              placeholder="enter password"
              required
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  [e.target.name]: e.target.value,
                })
              }
              value={inputs.password}
            />
          </div>
          <div className="text-xs m-2">
            Do not Have account?{" "}
            <Link to="/auth/signup" className="text-blue-400">
              Register
            </Link>
          </div>
          <div className=" flex items-center justify-center m-1">
            <button
              type="submit"
              className="border-2 border-white hover:text-black hover:bg-white py-1  m-2 rounded-full w-20 "
            >
              LogIn
            </button>
          </div>
        </form>
      </div>
    </AnimatedContainer>
    </div>
  );
}

export default Login;
