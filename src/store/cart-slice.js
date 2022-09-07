import {createSlice,current} from "@reduxjs/toolkit";
const CartSlice = createSlice({
    name:"cart",
    initialState:{
        items:[],
        totalPrice:0,
    },
    reducers:
    {
        addItemToCart(state,action){
            const newItem =action.payload;
            const existingItem = state.items.find(item=>item.id===newItem.id);
            
            if(!existingItem){

                state.items.push({
                id:newItem.id,
                img:newItem.img,
                quantity:1,
                type:newItem.type,
                price:newItem.price,
                title:newItem.title,
                totalPrice:parseFloat(newItem.price)*1
                });
               
            }
            else{
                existingItem.totalPrice=parseFloat(existingItem.totalPrice)+parseFloat(newItem.price);
                existingItem.quantity++;
            }
            console.log("redux me cartdata ha",current(state.items));
        },
    
        removeItemFromCart(state,action){
            const id=action.payload;
            const existingItem=state.items.find(item=>item.id===id)
    
            state.totalQuantity--;
            if (existingItem.quantity===1){
                state.items=state.items.filter(item=>item.id!==existingItem.id)
            }
            else{
                existingItem.totalPrice-=parseFloat(existingItem.price,2);
                existingItem.quantity--;
            }
            
        },
        addoneItem(state,action){
            const id=action.payload
            const existingItem=state.items.find(item=>item.id===id)
            console.log("existing item ha",existingItem);
            existingItem.quantity++;
            existingItem.totalPrice=parseFloat(existingItem.totalPrice)+parseFloat(existingItem.price);
        }
    }
    
}
);
export const cartActions=CartSlice.actions;
export default CartSlice;