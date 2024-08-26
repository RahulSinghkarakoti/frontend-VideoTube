import axiosInstance from "./axiosInstance";

const toggleSubscription=async(channelId)=>{
try {
    const response=await axiosInstance.post(`subscriptions/c/${channelId}`)
    return response.data
} catch (error) {
    throw error
}
}

const getSubscribers=async(channelId)=>{
    try {
        const response=await axiosInstance.get(`subscriptions/c/${channelId}`)
        return response.data
    } catch (error) {
        throw error
    }
}

const getSubscribedChannel=async(channelId)=>{
    try {
        const response=await axiosInstance.get(`subscriptions/u/${channelId}`)
        console.log(response)
        return response.data
    } catch (error) {
        throw error
    }
}

export {
    toggleSubscription,
    getSubscribers,
    getSubscribedChannel
}