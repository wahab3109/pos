import {React,useState} from "react"
import Login from "../login/login";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./register.css"

const Register = ()=>{
    const history =useNavigate();
const [showLogin,setShowLogin]=useState(false);
const [signupdata,setsignupData]=useState({
    fname:'',
    lname:"",
    email:"",
    password:"",
    phone:"",
    role:""
})
const signupinputchangeHandler=(event)=>{
    const{name,value}=event.target;
    setsignupData(prevValue=>{
        return({
            ...prevValue,
            [name]:value
        })
       
    }
    )
} 
const loginshowhandler=()=>{
    setShowLogin(true);
}
const loginhidehandler=()=>{
    setShowLogin(false)
}

const sendRequest= async()=>{
     const response=axios.post("http://localhost:5000/api/signup",{
    fname:signupdata.fname,
    lname:signupdata.lname,
    email:signupdata.email,
    password:signupdata.password,
    phone:signupdata.phone,
    role:signupdata.role
 }).catch(err=>{
    console.log(err)
 })
 const data = await response.data
 return data;
 
}
const formSubmitHandler=(e)=>{
    e.preventDefault();
    sendRequest().then(()=>{
        setShowLogin(true);
    })
}
 const rolesetHandler= async (name)=>{
    setsignupData(prevValue=>{
        return({
            ...prevValue,
            role:name,
    })
    })
    
}
    
   

  

    return (<>
    <div className="register__bgdiv">
        <div className="register__maindiv">
            <div className="register__leftimagediv">
           <h1>POINT OF SALE FOR YOUR CLOTHING BRAND</h1>
  </div>
            <div className="register__rightdiv">
            {!showLogin && (<div>
                <h2>Start For Free</h2>
                <h1>Create New Account</h1>
                <p>Already a member? <span className="resgister__rightdiv__span" onClick={loginshowhandler}>Login</span></p>
                <form className="regiter__form" onSubmit={formSubmitHandler}>
                    <input required type="text" name="fname" placeholder="first name" onChange={signupinputchangeHandler}></input>
                    <input required type="text" name="lname" placeholder="last name" onChange={signupinputchangeHandler}></input>
                    <input required type="text" name="email" placeholder="email" onChange={signupinputchangeHandler}></input>
                    <input required type="password" name="password" placeholder="password" onChange={signupinputchangeHandler}></input>
                    <input required type="text" name="phone" placeholder="phone" onChange={signupinputchangeHandler}></input>
                    <div className="registform__button__div">
                        <button type="submit"  onClick={()=>{rolesetHandler("admin")}} >Signup as Admin</button>
                        <button  type="submit" onClick={()=>{rolesetHandler("manager")}} >Signup as Manager</button>
                        <button  type="submit" onClick={()=>{rolesetHandler("staff")}} >Signup as Staff</button>

                    </div>
                    <p className="register__agreementp">I agree to abide by templatana's Terms of Service and its Privacy Policy</p>
                </form>
               </div> )
                }
               {showLogin  &&<Login onClose={loginhidehandler}/>}
            </div>
        </div>
    </div>
    </>)
}
export default Register;