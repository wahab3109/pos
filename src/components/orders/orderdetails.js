import React,{useState,useEffect} from "react";
import Table from 'react-bootstrap/Table';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import "./orderdetails.css"
const OrderDetails = (props)=>{
  

    const filteredData=props.orderedData.filter(x=>x._id===props.orderedDetails)
  console.log("filtered data ha",filteredData)
    return(<>
    <div className="od__bgdiv">
    <div className="od_maindiv">
    <div className="od__orderId">
    <KeyboardBackspaceOutlinedIcon className="od__backicon" onClick={props.onClose}/>
    <p>Order #<span>&nbsp;{props.orderedDetails.substring(0,5)}</span></p>

    </div> 
    <div className="od_table">
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
    { 
      filteredData.map((z,index)=>{
    console.log("x ha",z.itemData.map(x=>x.map(y=>y.name)))      
      return(         
          <tr>
            <td>{z.itemData.map(x=>x.map(y=> { return  (<span>{y.name}</span>)}))}</td>
            <td>{z.itemData.map(x=>x.map(y=>y.quantity))}</td>
            <td>{z.itemData.map(x=>x.map(y=>y.subtotal))}</td>
          </tr>
        );
  })
    }
    </tbody>
                  
            
           
          
        
     
    </Table>
 


    </div> 

    </div>
    </div>
    </>)
}
export default OrderDetails;