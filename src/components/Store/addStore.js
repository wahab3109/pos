import React,{useState} from "react";
import axios from "axios";
const AddStore = (props)=>{
    const [addItemHandler,setAddItemHandler]=useState({
        name:"",
        location:"",
        managedby:""
    })
    const inputChangeHandler=(event)=>{
        const {name,value}=event.target;
        setAddItemHandler((prevValue)=>{
            return({
                ...prevValue,
                [name]:value
            })
        })
    }
    const formSubmitHandler=(event)=>{
            event.preventDefault();
           addShopdata();
    }
    const addShopdata = async ()=>{
       try{ const res = axios.post("http://localhost:5000/api/addShop",{
            name:addItemHandler.name,
            location:addItemHandler.location,
            managedby:addItemHandler.managedby
        })
        props.setCheck(!props.check)
        const data = res.data;
        return data;
    }
    catch(err){
        console.log(err)
    }
}
    return (<>
    <div className="additem__bgdiv" >
        <div className="additem__maindiv">
        <h1>Add Items to the inventory</h1>
        <form onSubmit={formSubmitHandler} className="additem__form"> 
            <input value={addItemHandler.name} name="name" type="text" placeholder="Enter name" onChange={inputChangeHandler}></input>
            <input value={addItemHandler.location} name="location" type="text" placeholder="Enter location" onChange={inputChangeHandler}></input>
            <input value={addItemHandler.managedby} name="managedby" type="text" placeholder="Managed by" onChange={inputChangeHandler}></input>

            <div className="additem__btndiv"> 
            <button type="submit" >Add Shop</button>
            <button onClick={props.onClose} >Close</button>
            </div>
        </form>
        </div>
    </div>
    </>)
}
export default AddStore;