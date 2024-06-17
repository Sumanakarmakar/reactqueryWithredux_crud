import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../Api/ApiUrl/AxiosInstance";
import { endpoints } from "../Api/Endpoints/Endpoints";
import { toast } from "react-toastify";


const initialState = {
    Userdata: {},
    status: 'idle',
    redirectToLogin: null,
    redirectToDashboard: null,
    LogoutToggle: false,
    loading: false
}

export const registration = createAsyncThunk('signup/fetch', async (data) => {
    try {
        const response = await axiosInstance.post(endpoints.auth.register, data)
        return response?.data
    } catch (error) {
        console.log(error);
    }
})

export const login = createAsyncThunk('signin/fetch', async (data) => {
    try {
        const response = await axiosInstance.post(endpoints.auth.signin, data)
        return response?.data
    } catch (error) {
        console.log(error);
    }
})

export const AuthSlice = createSlice({
    name: 'member',
    initialState,
    reducers: {
        //for logout
        logout: (state, { payload }) => {
            state.LogoutToggle = false
            localStorage.removeItem("firstname")
            localStorage.removeItem("token")
            localStorage.removeItem("user")
        },

        //for checking token
        check_token: (state, { payload }) => {
            let token = localStorage.getItem('token') || sessionStorage.getItem('token')
            if (token !== null && token !== undefined && token !== "") {
                state.LogoutToggle = true
            }
        },

        //for redirect registration page
        regLogout: (state, { payload }) => {
            localStorage.removeItem("firstname")
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registration.pending, (state, { payload }) => {
                state.status = 'loading'
                state.loading = true
            })
            .addCase(registration.fulfilled, (state, { payload }) => {
                state.status = 'idle'
                state.loading = false
                console.log("registration fulfilled", payload);
                if (payload?.status === 200) {
                    // console.log("regdataslice", payload?.data);
                    localStorage.setItem("firstname", payload?.data?.first_name)
                    state.redirectToLogin = '/login'
                    toast.success(payload?.message)
                }
            })
            .addCase(registration.rejected, (state, { payload }) => {
                state.status = 'idle'
                state.loading = false
                toast.error(payload?.message)
            })

            .addCase(login.pending, (state, { payload }) => {
                state.status = 'loading'
                state.loading = true
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.status = 'idle'
                state.loading = false
                
                console.log("login fulfilled", payload?.data);
                if (payload?.status === 200) {
                    localStorage.setItem("firstname", payload?.data?.first_name)
                    localStorage.setItem("token", payload?.token)
                    localStorage.setItem("user", JSON.stringify(payload?.data))
                    state.Userdata = payload?.data
                    state.LogoutToggle = true
                    state.redirectToDashboard = '/'
                    toast.success(payload?.message)
                }
                if (payload?.data?.status === 201) {
                    toast(payload?.data?.message)
                }
            })
            .addCase(login.rejected, (state, { payload }) => {
                state.status = 'idle'
                state.loading = false
                console.log("login error", payload);
                toast.error(payload?.message)
            })
    }
})

export const {
    logout,
    check_token,
    regLogout
} = AuthSlice.actions