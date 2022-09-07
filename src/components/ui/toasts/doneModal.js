import React,{useState} from "react";
import "./doneModal.css"
import { useDispatch } from "react-redux";
import { modalActions } from "../../../store/model-slice";
const DoneModal = (props)=>{
   const dispatch=useDispatch();
    return(<>
        <div className="doneModal__bgdiv" >
            <div className="doneModal__maindiv">
                <h3>{props.title}</h3>
               <div className="close__maindiv">
                <button className="close__button" onClick={()=>{
                    dispatch(modalActions.removeModalState())
                }}>Close</button>
                </div>
                </div>
               
        </div>
    </>)
}
export default DoneModal;