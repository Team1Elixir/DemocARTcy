import axios from "axios";

// baseURL: 'https://whispering-woodland-44131.herokuapp.com/'
const server = axios.create({
  baseURL: "https://whispering-woodland-44131.herokuapp.com/",
});

export default server;
