import axiosInstance from "../ApiUrl/AxiosInstance";
import { endpoints } from "../Endpoints/Endpoints";



export const createProduct = async (data) => {
    try {
        const response = await axiosInstance.post(endpoints.cms.create, data)
        return response?.data
    } catch (error) {
        console.log(error);
    }
}