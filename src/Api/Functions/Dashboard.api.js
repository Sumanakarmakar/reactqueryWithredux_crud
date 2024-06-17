import axiosInstance from "../ApiUrl/AxiosInstance";
import { endpoints } from "../Endpoints/Endpoints";



export const getProfileDetails=async()=>{
    try{
        const response=await axiosInstance.get(endpoints.auth.profile)
        return response?.data
    }catch(error){
        console.log(error);
    }
}