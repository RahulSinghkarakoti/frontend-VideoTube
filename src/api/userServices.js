import axiosInstance from "./axiosInstance";

const login = async (inputs) => {
  console.log("login");
  try {
    const response = await axiosInstance.post("/users/login", inputs);
    return response.data;
  } catch (error) { 
    throw error;
  }
};

const register = async (formData) => {
  // console.log("register");
  try {
    const response = await axiosInstance.post("/users/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Set Content-Type header
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getCurrentUser = async () => {
  // console.log("getCurentUser");
  try {
    const response = await axiosInstance.get("/users/current-user");
    return response.data;
  } catch (error) {
    throw error;
  }
};


const getHistoryVideo=async()=>{
    // console.log("getHomeVideo")
    try {
        const response=await axiosInstance.get('/users/watch-history');
        return response.data
    } catch (error) {
        throw error
        
    }
}

const getChannelStats=async()=>{
  try {
    const response=await axiosInstance.get('/dashboard/stats');
    return response.data
} catch (error) {
    throw error
}
}

const getChannelVideo=async()=>{
  try {
    const response=await axiosInstance.get('/dashboard/videos');
    return response.data
} catch (error) {
    throw error
}
}

export { getCurrentUser, login, register,getHistoryVideo,getChannelStats,getChannelVideo };
