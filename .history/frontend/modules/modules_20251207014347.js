import axios from "axios";
// http request
export const http = (acessToken = null) => {
  axios.defaults.baseURL = import.meta.env.VITE_BASEURL;
};
// trim data
export const trimData = (obj) => {
  let finalObj = {};
  for (let key in obj) {
    finalObj[key] = obj[key]?.trim().toLowerCase();
  }
  return finalObj;
};
