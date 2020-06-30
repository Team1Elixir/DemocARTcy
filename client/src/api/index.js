import axios from 'axios';

const server = axios.create({
    baseURL: 'https://shrouded-ridge-07983.herokuapp.com/'
})

export default server;
