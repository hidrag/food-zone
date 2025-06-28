import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://food-zone-server-dev.onrender.com/api',
})

export default instance
