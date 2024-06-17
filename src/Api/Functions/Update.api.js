import axiosInstance from "../ApiUrl/AxiosInstance";
import { endpoints } from "../Endpoints/Endpoints";



export const updateProduct = async (data) => {
    try {
        const res = await axiosInstance.post(endpoints.cms.edit, data)
        return res?.data
    } catch (error) {
        console.log(error);
    }
}