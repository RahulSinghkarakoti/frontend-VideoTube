import axiosInstance from "./axiosInstance";

const createTweet = async (formData) => {
  try {
    const response = await axiosInstance.post("/tweet", formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getUserTweet = async (userId) => {
  try {
    const response = await axiosInstance.get(`/tweet/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAllTweets = async () => {
  try {
    const response = await axiosInstance.get(`/tweet/getAll`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updataTweet = async (tweetId,formData) => {
  try {
    const response = await axiosInstance.patch(`/tweet/${tweetId}`,formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteTweet = async (tweetId) => {
  try {
    const response = await axiosInstance.delete(`/tweet/${tweetId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { createTweet,getUserTweet, updataTweet, deleteTweet ,getAllTweets};
