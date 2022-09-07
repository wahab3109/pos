import React,{useState} from "react";
import axios from "axios"
const AddTeam = (props)=>{
    const [addTeamHandler,setAddTeamHandler]=useState({
        fname:"",
        lname:"",
        email:"",
        phone:"",
        role:"",
        password:"",
    })
    const inputChangeHandler=(event)=>{
        const {name,value}=event.target;
        setAddTeamHandler((prevValue)=>{
            return({
                ...prevValue,
                [name]:value
            })
        })
    }
    const sendRequest= async()=>{
        try{
        const response= await axios.post("http://localhost:5000/api/signup",{
       fname:addTeamHandler.fname,  
       lname:addTeamHandler.lname,
       email:addTeamHandler.email,
       password:addTeamHandler.password,
       phone:addTeamHandler.phone,
       role:addTeamHandler.role
    })
    props.setCheck(!props.check )
}
    catch(err){
       console.log(err)
    }
}
    const formSubmitHandler=(event)=>{
            event.preventDefault();
           
            console.log('add item forn valey is',addTeamHandler)
            sendRequest();
    }
    return (<>
    <div className="additem__bgdiv" >
        <div className="additem__maindiv">
        <h1>Add new user to the team</h1>
        <form onSubmit={formSubmitHandler} className="additem__form"> 
            <input value={addTeamHandler.fname} name="fname" type="text" placeholder="Enter fname" onChange={inputChangeHandler}></input>
            <input value={addTeamHandler.lname} name="lname" type="text" placeholder="Enter lname" onChange={inputChangeHandler}></input>
            <input value={addTeamHandler.email} name="email" type="text" placeholder="Enter email" onChange={inputChangeHandler}></input>
            <input value={addTeamHandler.phone} name="phone" type="text" placeholder="Enter phone#" onChange={inputChangeHandler}></input>
            <input value={addTeamHandler.role} name="role" type="text" placeholder="enterrole" onChange={inputChangeHandler}></input>
            <input value={addTeamHandler.password} name="password" type="text" placeholder="enter password" onChange={inputChangeHandler}></input>

            <div className="additem__btndiv"> 
            <button type="submit" >Add User</button>
            <button onClick={props.onClose} >Close</button>
            </div>
        </form>
        </div>
    </div>
    </>)
}
export default AddTeam;