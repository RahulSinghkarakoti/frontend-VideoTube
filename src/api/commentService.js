import axiosInstance from "./axiosInstance";
 

const getVideoComment = async (videoId) => {
  // console.log("getVideoComment");
  try {
    const response = await axiosInstance.get(`/comments/${videoId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const addVideoComment = async (videoId,formData) => {
    // console.log("getVideoComment");
    try {
      const response = await axiosInstance.post(`/comments/${videoId}`,formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

const deleteVideoComment = async (commentId) => {
    // console.log("deleteVideoComment");
    try {
      const response = await axiosInstance.delete(`/comments/c/${commentId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export { getVideoComment,addVideoComment,deleteVideoComment };
