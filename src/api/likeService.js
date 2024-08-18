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


const toggleVideoLike=async(videoId)=>{
  // console.log("togglelike");
  try {
    console.log(videoId)
    const response = await axiosInstance.post(`/like/toggle/v/${videoId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}


const toggleCommentLike=async(commentId)=>{
  console.log("togglecommentlike");
  try {
    console.log(commentId)
    const response = await axiosInstance.post(`/like/toggle/c/${commentId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

 

export {getLikedVideo,toggleVideoLike,toggleCommentLike}