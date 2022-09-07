import React,{useState} from "react";
import axios from "axios"
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import img from "../../images/categoryimages/kidcategory.jpg"
import "./cart.css"
import DoneModal from "../ui/toasts/doneModal";
import { modalActions } from "../../store/model-slice";
const Cart = ()=>{
    const [radioData,setRadioData]=useState();
    const [date,setDate]=useState()
    const [showOrderToast,setShowOrderToast]=useState(false)
    const [shop,setShop]=useState();
    const email = useSelector(state=>state.userData.email);
    // console.log('email ha',email)
    var subTotal=[];
    const cart=useSelector(state=>state.cart.items);
    const dispatch=useDispatch();
        const [orderedData,setorderedData]=useState({
        items:[],
        givenBy:"",
        totalPrice:"",
        payment:"",
        shop:""
    })


    cart.map(x=>{
        return subTotal.push(x.totalPrice)
    })

    const subT=  parseFloat(subTotal.reduce((a, b) => a + b, 0).toFixed(2))
    const tax = parseFloat((parseFloat(subT)/10).toFixed(2));
    const discount=5.12
    const total=parseFloat((parseFloat(subT)+parseFloat(tax)).toFixed(2))
    const removItemfromTheCart=(id)=>{
        dispatch(cartActions.removeItemFromCart(id))
    }
    const addItemviaplus=(id)=>{
        dispatch(cartActions.addoneItem(id));
    }
    const dateChangeHandler=(e)=>{
        setDate(e.target.value)
    }
    const radioChangeHandler = (e)=>{
        setRadioData(e.target.value)
     
    }
    const shopchangeHandler=(e)=>{
            setShop(e.target.value);
    }
    const orderDataHandler =  ()=>{

        setorderedData( (prevValue) =>
        {return({
            ...prevValue,
            items:cart,
            givenBy:email,
            totalPrice:total,
            payment:radioData,
            shop:shop,
            date:date
        })

        })
        console.log("ordered data is",orderedData);

           

    }
    const postOrder= async ()=>{
        const res = await axios.post("http://localhost:5000/api/postOrder",{

            items:orderedData.items,
            givenBy:orderedData.givenBy,
            totalPrice:orderedData.totalPrice,
            payment:orderedData.payment,
            shop:orderedData.shop,
            date:orderedData.date
            
        })
        dispatch(modalActions.setModalState())

        const data = await res.data;
        return data;
    }
    const sendOrderHandler=(e)=>{
        e.preventDefault()
        setShowOrderToast(true)
         postOrder()
         
    }
  


    return (<>
   
    <div className="cart__bgdiv">
        <div className="cart__maindiv">
          <h6 >Current Order</h6>
         {cart.map((x,index)=>{
            var base64String
    if(x.img){
     base64String = btoa(
      String.fromCharCode(...new Uint8Array(x.img.data.data))
    )}
            return (
                <div key={index} className="cart__orderitemsdiv">
            <div className="cart__imgdiv">
                <img src={`data:image/jpg;base64,${base64String}`}/>
            </div>
            <div className="cart__headingandpricediv">
                <div className="cart__headingdiv"> <p>{x.title}</p></div>
                <div className="cart__pricequantity">
                    <p>${x.totalPrice}</p>
                    <div className="quantitydiv">
                    <AddOutlinedIcon className="cart__icons"  onClick={()=>addItemviaplus(x.id)}/>
                    <span>{x.quantity}</span>
                    <RemoveOutlinedIcon className="cart__icons" onClick={()=>removItemfromTheCart(x.id)}/>
                    </div>
                </div>
            </div>
          </div>
            )}
            )}

        </div>
        <div className="cart__datadiv">
            <div className="cat__datainnerdiv">
                <span>Sub Total</span>
                <p>${subT}</p>
            </div>
            <div className="cat__datainnerdiv">
                <span>Tax</span>
                <p>${tax}</p>
            </div>
            <div className="cat__datainnerdiv">
                <span>Discount</span>
                <p>${discount}</p>
            </div>
            <div className="cat__datainnerdiv cart__datalastinner">
                <span className="totalspan">Total</span>
                <p className="totalp">${total}</p>
            </div>

         </div>
         <div className="order__paymentmethod">
            <p>Payment Method</p>
            <div className="order__radiodiv" onChange={radioChangeHandler}>
        <input type="radio" value="cash" name="gender" className="radioinput"/><span>Cash</span>
        <input type="radio" value="credit Card" name="gender" /> <span>Credit Card</span>
      </div>
         </div>
            <div className="order__button">
                <form onSubmit={sendOrderHandler}>
                <input className="shop__shopname" type="text" placeholder="shop name" onChange={shopchangeHandler}></input>
                {/* <input type="date" onChange={dateChangeHandler}></input> */}
                <button onClick={orderDataHandler}
                >Order</button>
                 {/* {showOrderToast &&<p>Order submitted</p>} */}
                </form>
            </div>
    </div>
    </>)
}
export default Cart;