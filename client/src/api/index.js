import axios from 'axios';

const server = axios.create({
    baseURL: 'https://whispering-woodland-44131.herokuapp.com/'
})

export default server;
