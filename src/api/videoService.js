import axiosInstance from "./axiosInstance";

const getLikedVideo = async () => {
  // console.log("getLikedVideo");
  try {
    const response = await axiosInstance.get("/like/videos");
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getHomeVideo = async () => {
  // console.log("getHomeVideo");
  try {
    const response = await new Promise((resolve) => {
      setTimeout(async () => {
        const result = await axiosInstance.get("/video");
        resolve(result);
      }, 1000); // Delay for 3 seconds
    });
    
    return response.data;
  }
  catch (error) {
    throw error;
  }
};

const getVideo = async (videoId) => {
  // console.log("getVideo");
  try {
    // console.log(videoId)
    const response = await axiosInstance.get(`/video/${videoId}`); 
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateVideoView = async (videoId) => {
  // console.log("updataVideoView");
  try {
    const response = await axiosInstance.patch(`/video/update/views/${videoId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const uploadeVideo=async(formData)=>{
  // console.log("uploadVideo")
  try {
    const response = await axiosInstance.post("/video",formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export { getLikedVideo, getHomeVideo, getVideo ,updateVideoView,uploadeVideo};
