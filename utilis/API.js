import axios from "axios"

const API = axios.create({
    baseURL:'https://rsz6dccky2.execute-api.me-south-1.amazonaws.com/dev/api/'
    // baseURL: 'http://15.185.94.17/api/'
})

export default API