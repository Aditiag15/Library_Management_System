import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import bookReducer from "./slices/bookSlice";
import borrowReducer from "./slices/borrowSlice";
import popupReducer from "./slices/popUpSlice";
import userReducer from "./slices/userSlice";


export const  store =  configureStore({
     reducer:{
        auth: authReducer,
        popup: popupReducer,
        user: userReducer,
        book: bookReducer,
        borrow: borrowReducer,
     }
})

