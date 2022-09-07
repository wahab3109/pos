import React from "react";
import {useDispatch,useSelector} from "react-redux";
import { cartActions } from "../../../store/cart-slice";
import "./itemcard.css";
const ItemCard = (props)=>{
    const dispatch = useDispatch();
    const addItemToCartHandler=()=>{
        dispatch(cartActions.addItemToCart({
                id:props.id,
                img:props.img,
                type:props.type,
                description:props.description,
                title:props.title,
                price:props.price
        }));
    }
    var base64String
    if(props.img){
     base64String = btoa(
      String.fromCharCode(...new Uint8Array(props.img.data.data))
    )}
    return(<>
    <div className="itemcard__bgdiv">
        <div className="itemcard__maindiv">
            {           
            <img src={`data:image/jpg;base64,${base64String}`}/>}
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            <h2>${props.price}</h2>
            <button onClick={addItemToCartHandler} >Add to Cart</button>
        </div>
    </div>
    </>)
}
export default ItemCard;