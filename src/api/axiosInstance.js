import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backend-3par.onrender.com/api/v1",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken") || "";
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
  (error) => {
    return Promise.reject(error);
  }
);

async function getNewRefreshToken() {
  try {
    console.log("geting");
    const refreshToken = localStorage.getItem("refreshToken");
    console.log(refreshToken);
    const response = await axios.post(
      "/users/refresh-token",
      {
        refreshToken,
      } 
    );
    console.log("milgya resp");
    console.log(response.data.data.accessToken);
    localStorage.setItem("accessToken", response.data.data.accessToken);
    localStorage.setItem("refreshToken", response.data.data.refreshToken);
    return response.data.accessToken;
  } catch (error) {
    console.log("unable to refresh token", error);
    throw error;
  }
}

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

 async  (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        console.log("one");
        const newToken = await getNewRefreshToken();
        console.log("the end");

        axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (tokenRefreshError) {
        return Promise.reject(tokenRefreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
