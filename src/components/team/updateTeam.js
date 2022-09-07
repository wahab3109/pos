import React,{useState} from "react";
import axios from "axios";
const UpdateTeams = (props)=>{
    const updateduser=props.userData.find(x=>{
      return  x._id===props.updatedUserId
    })

    const [addItemHandler,setAddItemHandler]=useState({
        fname:updateduser.fname,
        lname:updateduser.lname,
        email:updateduser.email,
        phone:updateduser.phone,
        role:updateduser.role
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
            try{
            axios.patch("http://localhost:5000/api/updateUser/" + props.updatedUserId,
            {fname:addItemHandler.fname,
            lname:addItemHandler.lname,
        role:addItemHandler.role,
    password:addItemHandler.password,phone:addItemHandler.phone})
    props.setCheck(!props.check);
    }
    catch(err){
        console.log(err)
    }
}
    return (<>
    <div className="additem__bgdiv" >
        <div className="additem__maindiv">
        <h1>Update the existing users</h1>
        <form onSubmit={formSubmitHandler} className="additem__form"> 
            <input value={addItemHandler.fname} name="fname" type="text" placeholder="Enter fname" onChange={inputChangeHandler}></input>
            <input value={addItemHandler.lname} name="lname" type="text" placeholder="Enter lname" onChange={inputChangeHandler}></input>
            <input value={addItemHandler.email} name="email" type="text" placeholder="Enter email" disabled onChange={inputChangeHandler}></input>
            <input value={addItemHandler.phone} name="phone" type="text" placeholder="Enter phone#" onChange={inputChangeHandler}></input>
            <input value={addItemHandler.role} name="role" type="text" placeholder="enterrole" onChange={inputChangeHandler}></input>
            <div className="additem__btndiv"> 
            <button type="submit" >Update User</button>
            <button onClick={props.onClose} >Close</button>
            </div>
        </form>
        </div>
    </div>
    </>)
}
export default UpdateTeams;