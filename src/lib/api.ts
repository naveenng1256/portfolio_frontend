import axios from "axios"
import { isLocal } from "./utils"


const api = axios.create({
	baseURL: isLocal()
	?  "http://localhost:3000/api/"
	: "https://backend-server-portfolio-gfyy.onrender.com/api/",
})

export default api
