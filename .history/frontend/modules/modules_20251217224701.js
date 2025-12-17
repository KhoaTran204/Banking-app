import axios from "axios";
// http request
export const http = (accessToken = null) => {
  axios.defaults.baseURL = import.meta.env.VITE_BASEURL;
  if (accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  return axios;
};
// trim data
export const trimData = (obj) => {
  let finalObj = {};
  for (let key in obj) {
    finalObj[key] = obj[key]?.trim().toLowerCase();
  }
  return finalObj;
};

// fetcher
export const fetchData = async (api) => {
  try {
    const httpReq = http();
    const { data } = await httpReq.get(api);
    return data;
  } catch (err) {
    return null;
  }
};

export const uploadFile = async (file, folderName) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const httpReq = http();
    const response = await httpReq.post(
      `/api/upload?folderName=${folderName}`,
      formData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
