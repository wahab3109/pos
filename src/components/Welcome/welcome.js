import React,{useEffect} from "react";
import "./welcome.css"
const Welcome = (props)=>{
    useEffect(()=>{
       
    },[])
    return(<>
    <div className="welcome__maindiv">
    <p className="welcome__p">Welcome to the POS for clothes</p>
    <p className="welcome__smallp">
        Your own panel for managing your sales and stocks
    </p></div>
    </>)
}
export default Welcome;