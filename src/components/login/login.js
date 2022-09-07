import React,{useState} from "react";
import axios from "axios"
import "./login.css"
import { useNavigate } from "react-router-dom";
const Login = (props)=>{
    const history = useNavigate();
    const [loginData,setLogindata]=useState({
        email:"",
        password:""
    })
    const [error,setError]=useState();
    const LogininputchangeHandler=(event)=>{
        const {name,value}=event.target;
        setLogindata(prevValue=>{
            return({
                ...prevValue,
                [name]:value,
            })
        })
    }
    const sendLoginRequest = async ()=>{
        const response = await axios.post("http://localhost:5000/api/login",{
            email:loginData.email,
            password:loginData.password
        }).catch(err=>{
            setError(err?.response?.data)
            console.log("error ha",error)
        }
        )
       
        const data = await response.data;
        
        return data
    }
    const loginformSubmitHandler=(event)=>{
        event.preventDefault();
        sendLoginRequest().then(()=>{
            history("/home/welcome")
        });
    }
   
    return (<>
 
                <h1 className="login__h1">Welcome Back</h1>
               
                <form className="regiter__form" onSubmit={loginformSubmitHandler}>
                  
                    <input required type="text" name="email" placeholder="email" onChange={LogininputchangeHandler}></input>
                    <input required type="password" name="password" placeholder="password" onChange={LogininputchangeHandler}></input>
                    {error && <p className="error__msg">{error.message}</p>}
                    <div className="registform__button__div">
                        <button  type="submit" className="Loginbutton">Login</button>

                    </div>
                </form>
                <p className="login__p">New to the App? <span onClick={props.onClose}>Register</span></p>
    </>)
}
export default Login;