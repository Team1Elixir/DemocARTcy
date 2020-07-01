import axios from "axios";

const server = axios.create({
  baseURL: "https://whispering-woodland-44131.herokuapp.com/",
  //   baseURL: "http://localhost:3000/",
});

export default server;
