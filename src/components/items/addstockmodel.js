import React,{useState} from "react";
import axios from "axios"
import {useNavigate} from "react-router-dom"

import "./addstockmodel.css";
import DoneModal from "../ui/toasts/doneModal";
import DoneToast from "../ui/toasts/doneToast";

const AddStockModel = (props)=>{
    const location = useNavigate();
    const [stock,setStock]=useState()
    const [id,setId]=(props.data);
    const [showDoneModal,setShowDoneModal]=useState(false)
    const inputChangeHandler=(event)=>{
        setStock(event.target.value)
    }
    const hideDoneModal=()=>{
        setShowDoneModal(false)
    }
    const formSubmitHandler = async (e)=>{
        e.preventDefault();
        try{
          const res = await  axios.patch("http://localhost:5000/api/updateStock/" + props.data,
            {stock:stock,
            iddd:id})
            console.log("response is",res)
            props.setCheck(!props.check)
            if(res.status===200)
        {           
        }
        }
        catch(err){
            console.log(err)
        }
        
       
      
            // location("/home/store")
    //   props.onClose();
       


    }

    return(<>
    {showDoneModal &&<DoneModal onClose={hideDoneModal}
        title="stock updated"
    /> }
        <div className="addstock__bgdiv" >
            <div className="addstock__maindiv">
                <h3>Update stock</h3>
                <form onSubmit={formSubmitHandler} className="addStock__form">
                <input type="number" placeholder="Enter Stock amount" onChange={inputChangeHandler}></input>
                <div className="addstock__btndiv">
                <button type="submit">Add</button>
                <button onClick={props.onClose}>Close</button>
                </div>
                </form>
            </div>
        </div>
    </>)
}
export default AddStockModel;