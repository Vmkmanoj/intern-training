import axios from "axios";

const API = "http://localhost:8000/post"

export const taskData = async(id:string)=>{
    const res = await axios.get(`${API}/get-post/${id}`);
    return res.data;
}

export const postTaskData = async(createPost : any)=>{
    const res = await axios.post(`${API}/create-post`,createPost)
    return res.data
}

export const getAllPost = async()=> {
    const res = await axios.get(
        `${API}/get-all-post`
    )
    return res.data
}