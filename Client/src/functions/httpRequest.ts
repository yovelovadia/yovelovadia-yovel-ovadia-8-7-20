import axios from "axios";
//reason for custom fetch is because im using axios it mighe be decapricated one day for larger project good to contain the packages if its somthing im using alot

const fetchData = async (action, url, params?): Promise<any> => {
  const token: string | null = localStorage.getItem("jwt");
  axios.defaults.headers.common["authorization"] = `Bearer ${token}`; // sending auth for every request
  const data = await axios[action](url || url.slice(21), params);
  return data;
};

export default fetchData;
