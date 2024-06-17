import axiosInstance from "../ApiUrl/AxiosInstance";
import { endpoints } from "../Endpoints/Endpoints";


export const getProductDetails=async(id)=>{
    try{
        const response=await axiosInstance.get(`${endpoints.cms.detail}/${id}`)
        return response?.data?.data
        
    }catch(err){
        console.log(err);
    }
}