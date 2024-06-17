import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "../AuthSlice";


const Store = configureStore({
    reducer: {
        auth: AuthSlice.reducer
    }
})

export default Store