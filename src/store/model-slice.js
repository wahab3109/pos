import {createSlice} from "@reduxjs/toolkit";
const modalSlice = createSlice({
    name:"modal",
    initialState:{
        modalState:false,
    },
    reducers:{
        setModalState(state,action){   
           state.modalState=true;
        },
        removeModalState(state,action){
            state.modalState=false;
        }
      
    }
});
    export const modalActions=modalSlice.actions;    
    export default modalSlice;