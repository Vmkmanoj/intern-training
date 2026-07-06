import axios from "axios";

const API = "http://localhost:8000/users"

export const getUserData = async(id:string)=> {
    const res = await axios.get(`${API}/get-user/${id}`);
    return res.data;
}