import axios from "axios";
const imgAPI = import.meta.env.VITE_IMGBB_API;
const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgAPI}`
export const uploadImage = async(file) =>{
    const formData = new FormData();
    formData.append('image', file);
    const {data} = await axios.post(imgHostingApi, formData)
 
    return data.data.display_url;
}