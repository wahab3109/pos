import React,{useEffect, useState} from "react";
import Table from 'react-bootstrap/Table';
import axios from "axios"
import { useSelector } from "react-redux";

import AddStore from "./addStore";
import SpecificStore from "./specificstore";
import "./store.css"
const Store = ()=>{
  const role = useSelector(state=>state.userData.role);
  const email = useSelector(state=>state.userData.email)
  console.log("email ha",email)
  const[showShopDetailsDiv,setShowShopDetailsDiv]=useState(false);
  const [showAddStore,setShowAddStore]=useState(false);
  const [shopData,setShopData]=useState([{
    _id:"",
    name:"",
    location:"",
    managedby:""
   
  }]);
  const [noShop,setNoShop]=useState(false)
  const [check,setCheck]=useState(false)
  const [shopName,setShopName]=useState();
  const [orderedData,setOrderedData]=useState([{
    _id:"",
    items:[],
    givenBy:"",
    totalPrice:"",
    payment:"",
    itemData:[],
    date:""
  }])

  const shopdivhandler = (x)=>{
    setShopName(x);
    setShowShopDetailsDiv(true)
  }
  const hideShopDivHandler=()=>{
    setShowShopDetailsDiv(false)
  }
  const AddStoreHandler= ()=>{
    setShowAddStore(true)
  }
  const hideAddStoreHandler=()=>{
    setShowAddStore(false)
  }
  const getShopData=async ()=>{
    const res = await axios.get("http://localhost:5000/api/viewShops")
    .catch((err)=>{
      console.log(err)
    })
    const data = await res.data;
    return data;
    
  }
  const viewOrder= async ()=>{
    const res = await axios.get("http://localhost:5000/api/viewOrder").
    catch(err=>{
      console.log(err)
    })
    const data = await res.data;
    return data;
}
  useEffect(()=>{
    getShopData().then((data)=>{
      setShopData(data.shop)
   
    });
    
  },[check])
  useEffect(()=>{
    viewOrder().then((data)=>{
      setOrderedData(data.order)
    })    
}

,[])
  console.log("shop data is",shopData)
    return (<>

    {showAddStore && <AddStore onClose={hideAddStoreHandler}
       check={check} setCheck={setCheck}
    />}
    {showShopDetailsDiv && <SpecificStore onClose={hideShopDivHandler}  orderedData={orderedData} shopName={shopName}/>}
    {!showShopDetailsDiv && <div className="store__bgdiv">
        <div className="store__maindiv">
            <h3>Your Shops</h3>
          {role==="admin" &&  <div className="addItemdivandlocation">
            <button className="addshopbtn"  onClick={AddStoreHandler}>Add New Shop</button>
            </div>
          }
      <Table striped bordered hover>
      <thead>
        <tr>
        <th>Index</th>
          <th>Name</th>
          <th>Location</th>
          <th>Managed by</th>
          <th>Details</th>
        </tr>
      </thead>
      { shopData.filter(val=>{
        if(role==="manager" &&
           val?.managedby?.email?.toLowerCase().includes(email.toLowerCase())){
            console.log("val ha ",val)

            return val
        }
        
        else if(role==="admin"){
          console.log("dsra if chl ah")

          return val
        }
        else if (role==="manager" &&
           !(val?.managedby?.email?.toLowerCase().includes(email.toLowerCase()))){
            return;
           }

   
      })
      
      .map((x,index)=>{

        return (
          
          <tbody key={x._id}>
        <tr>
            <td>{index}</td>
          <td>{x.name}</td>
          <td>{x.location.location}</td>
          <td>{x.managedby.email}</td>
          <td><button className="items__addstockbtn" onClick={()=>shopdivhandler(x.name)}> View Details</button></td>

        </tr>
        
        </tbody>
      )
      })}
      
        </Table>
         
        
        </div>
    </div>}
    </>)
}
export default Store;