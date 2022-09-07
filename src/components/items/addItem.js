import axios from "axios";
import React,{useState} from "react";
import {useNavigate} from "react-router-dom"

import "./additem.css"
import DoneModal from "../ui/toasts/doneModal";

const AddItems = (props)=>{

    const [addItemHandler,setAddItemHandler]=useState({
        title:"",
        price:"",
        description:"",
        stock:"",
        type:""
    })
    const location = useNavigate();

    // const hideDoneModal=()=>{
    //     setShowDoneModal(false)
    // }
    const [img,setImg]=useState(null);
    const imageHandler=(e)=>{
        setImg(e.target.files[0])
    }
    const inputChangeHandler=(event)=>{
        const {name,value}=event.target;
        setAddItemHandler((prevValue)=>{
            return({
                ...prevValue,
                [name]:value,
               
            })
        })
    }
    const formData = new FormData();
    formData.append("title", addItemHandler.title);
    formData.append("price", addItemHandler.price);
    formData.append("description",addItemHandler.description);
    formData.append("stock", addItemHandler.stock);
    formData.append("type", addItemHandler.type);

    formData.append("img", img);
    const addItemData=async ()=>{
       try{const res = await axios.post("http://localhost:5000/api/addItems",
        formData,
        {headers: {'Content-Type': 'multipart/form-data'}}
            // title:addItemHandler.title,
            // price:addItemHandler.price,
            // description:addItemHandler.description,
            // stock:addItemHandler.stock,
            // img:img
        )
        props.setCheck(!props.check)
        const data = await res.data;
        return data;
    }
    catch(err){
        console.log(err)
    }

        

    }
    const formSubmitHandler=(event)=>{
            event.preventDefault();
            console.log("img is",img)
            addItemData().then(()=>{
                console.log("then chl rha ha")
              
            })
;

            
    }
    
    return (<>
    <div className="additem__bgdiv" >
        <div className="additem__maindiv">
        <h1>Add Items to the inventory</h1>
        <form onSubmit={formSubmitHandler} className="additem__form"> 
            <input value={addItemHandler.title} name="title" type="text" placeholder="Enter name" onChange={inputChangeHandler}></input>
            <input value={addItemHandler.price} name="price" type="number" placeholder="Enter Price" onChange={inputChangeHandler}></input>
            <input value={addItemHandler.description} name="description" type="text" placeholder="Enter a brief descripton" onChange={inputChangeHandler}></input>
            <input value={addItemHandler.stock} name="stock" type="text" placeholder="Enter Stock" onChange={inputChangeHandler}></input>
            <input value={addItemHandler.type} name="type" type="text" placeholder="Enter type" onChange={inputChangeHandler}></input>

            <input filename="img" name="img" type="file" placeholder="Insert image" onChange={imageHandler}></input>
            <div className="additem__btndiv"> 
            {/* <img width={100} src={img === ""  ? "" :URL.createObjectURL(img)} /> */}
            <button type="submit" onClick={props.get} >Insert Item</button>
            <button onClick={props.onClose} >Close</button>

            </div>
        </form>
        </div>
    </div>
    </>)
}
export default AddItems;