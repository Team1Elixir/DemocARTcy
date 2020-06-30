import axios from "axios";

const server = axios.create({
  baseURL: "https://shrouded-ridge-07983.herokuapp.com/",
  //   baseURL: "http://localhost:3000/",
});

export default server;
