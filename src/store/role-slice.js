import {createSlice} from "@reduxjs/toolkit";
const userSlice = createSlice({
    name:"userData",
    initialState:{
        role:"",
        fname:"",
        lname:"" ,
        email:"",
        _id:"",
    },
    reducers:{
        addUserData(state,action){   
            state.role=action.payload.role;
            state.fname=action.payload.fname;
            state.lname=action.payload.lname;  
            state.email=action.payload.email;
            state._id=action.payload._id;
        },
        removUserData(state,action){
            state.role="";
            state.fname="";
            state.lname=""; 
            state.email="";
            state._id=""
        }
    }
    });
    export const userActions=userSlice.actions;    
    export default userSlice;