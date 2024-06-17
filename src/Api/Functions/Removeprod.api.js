import axiosInstance from "../ApiUrl/AxiosInstance";
import { endpoints } from "../Endpoints/Endpoints";



export const deleteProduct = async (id) => {
    try {
        const res = await axiosInstance.post(endpoints.cms.remove, { id })
        return res?.data
    } catch (error) {
        console.log(error);
    }
}