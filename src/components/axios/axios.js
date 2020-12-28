import axios from 'axios'

const instance = axios.create({
    baseURL:"https://chatapp-639b6-default-rtdb.firebaseio.com/"
})

export default instance;