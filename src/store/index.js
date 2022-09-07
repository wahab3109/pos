import {configureStore} from "@reduxjs/toolkit";
import CartSlice from "./cart-slice";
import userSlice from "./role-slice";
import itemSlice from "./item-slice";
import modalSlice from "./model-slice";


const Store =configureStore({
    reducer:{cart:CartSlice.reducer,
    userData:userSlice.reducer,
    item:itemSlice.reducer,
    modal:modalSlice.reducer
    }
   
});
export default Store;