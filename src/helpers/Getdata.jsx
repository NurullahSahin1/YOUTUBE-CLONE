import axios from "axios";

const options = {
  headers: {
    "X-RapidAPI-Key": "a6645991e2mshfdbbd47b5e6fd6fp199e0bjsna0128c3eaab9",
    "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
  },
  params: {
    lang: "tr",
    geo: "TR",
  },
};

//https://rapidapi.com/ytjar/api/yt-api

axios.defaults.baseURL = "https://yt-api.p.rapidapi.com/";

export const getData = async (endpoint) => {
  try {
    const res = await axios.get(endpoint, options);
    return res.data;
  } catch (error) {
    console.log("Verileri Çekerken Hata Oluştu", error);
  }
};
