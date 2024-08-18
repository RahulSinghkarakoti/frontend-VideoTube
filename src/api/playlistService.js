import axiosInstance from "./axiosInstance";

const createPlaylist = async (formData) => {
  try {
    const response = await axiosInstance.post("/playlist", formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deletePlaylist = async (playlistId) => {
    try{
        const response=await axiosInstance.delete(`/playlist/${playlistId}`);
        return response.data;
        }
        catch(error){
            throw error;
        }

};

const getPlaylistById=async(playlistId)=>{
    try{
        const response=await axiosInstance.get(`/playlist/${playlistId}`);
        return response.data;
        }
        catch(error){
            throw error;
        }
}

const updatePlaylist=async()=>{
    try{
        const response=await axiosInstance.patch(`/playlist/${playlistId}`);
        return response.data;
        }
        catch(error){
            throw error;
        }
}

const getUserPlaylists = async (userId) => {
  try {
    const response = await axiosInstance.get(`/playlist/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const addToPlaylist = async (videoId,playlistId) => {
    try {
        const response = await axiosInstance.patch(`/playlist/add/${videoId}/${playlistId}`);
        return response.data;
        } catch (error) {
            throw error;
            }
};



const removeFromPlaylist = async (videoId,playlistId) => {
    try {
        const response = await axiosInstance.patch(`/playlist/remove/${videoId}/${playlistId}`);
        return response.data;
        } catch (error) {
            throw error;
            }
}; 

export {
  createPlaylist,
  getPlaylistById,
  addToPlaylist,
  deletePlaylist,
  removeFromPlaylist,
  updatePlaylist,
  getUserPlaylists
};
