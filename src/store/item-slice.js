import {createSlice} from "@reduxjs/toolkit";
const itemSlice = createSlice({
    name:"item",
    initialState:{
        item:[]
    },
    reducers:{
        addItemData(state,action){ 

            state.item.push({
                img:action.payload.img,
                price:action.payload.price,
                description:action.payload.description,  
                title:action.payload.title,
                stock:action.payload.stock,
                _id:action.payload._id
            })
          
            console.log("role ka data reducer me ha",state.item.stock)  
        }
    }
    });
    export const itemActions=itemSlice.actions;    
    export default itemSlice;