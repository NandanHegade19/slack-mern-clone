import axios from 'axios';

const instance = axios.create({
    baseURL: "https://slack-mern-clone-backend.herokuapp.com"
})

export default instance;