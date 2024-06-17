import axiosInstance from "../ApiUrl/AxiosInstance";
import { endpoints } from "../Endpoints/Endpoints";


export const getAllProducts=async(data)=>{
    try{
        const response=await axiosInstance.post(endpoints.cms.list, data)
        // console.log(response);
        return response?.data
    }catch(error){
        console.log(error);
    }
}