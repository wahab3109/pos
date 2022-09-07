import React from "react";
import Table from 'react-bootstrap/Table';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import "./specificstore.css"
const SpecificStore = (props)=>{

  console.log("order data ha",props.orderedData)
  const filteredShop=props.orderedData.filter(x=>x.shop.name===props.shopName)
  console.log("shopname ha",props.shopName)
  console.log("filtered Shop is",filteredShop)
    return (<>

    <div className="specificStore__bgdiv">
        <div className="specificStore__maindiv">
        <div className="specifiStore__idandlocationdiv">
        <KeyboardBackspaceOutlinedIcon className="od__backicon" onClick={props.onClose}/>
            <h5>{props.shopName}</h5>
           
            </div>
            <Table striped bordered hover>
      <thead>
        <tr>
        <th>Index</th>
        <th>Date</th>
        <th>Order Id</th>
        <th>given by</th>
        <th>Total Sale</th> 
        </tr>
      </thead>
      {filteredShop.map((x,index)=>{
      return (
        <tbody>
        <tr>
            <td>{index}</td>
          <td>{x.date.substring(0,10)}</td>
          <td>{x._id}</td>
          <td>{x.givenBy.email}</td>
            <td>${x.totalPrice}</td>

        </tr>
        
        </tbody>
      )
       } )
      };
     
        </Table>
        </div>
    </div>
    </>)
}
export default SpecificStore;