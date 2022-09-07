import React,{useState,useEffect,useCallback} from "react";
import Table from 'react-bootstrap/Table';
import DatePicker from 'react-date-picker';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useSelector } from "react-redux";
import OrderDetails from "./orderdetails";
import axios from "axios"


import "./orders.css"
const Order = ()=>{
    const [orderedData,setOrderedData]=useState([{
      _id:"",
      items:[],
      givenBy:"",
      totalPrice:"",
      payment:"",
      itemData:[],
      date:""
    }])
    const [shopData,setShopData]=useState([{
      _id:"",
      name:"",
      location:"",
      managedby:""
     
    }]);

  const email = useSelector(state=>state.userData.email)
  const role = useSelector(state=>state.userData.role);

    console.log("email ha",email)
    const id = useSelector(state=>state.userData._id);
    console.log("id ha",id)
    const getShopData=async ()=>{
      const res = await axios.get("http://localhost:5000/api/viewShops")
      .catch((err)=>{
        console.log(err)
      })
      const data = await res.data;
      return data;
      
    }
    useEffect(()=>{
      getShopData().then((data)=>{
        setShopData(data.shop)
        console.log("managed by ha",shopData)
     
      });
      
    },[])

    const [orderedDetails,setOrderedDetails]=useState()
    
    const [date, onChange] = useState(new Date());
    
    const [showOrderDetails,setShowOrderDetails]=useState(false);
    const showOdetails=(id)=>{
        setOrderedDetails(id)
        setShowOrderDetails(true);
    }
    const hideOdetails=()=>{
        setShowOrderDetails(false)
    }
   
    
  
    const getFormattedDate =(date)=> {
      var year = date.getFullYear();
    
      var month = (1 + date.getMonth()).toString();
      month = month.length > 1 ? month : '0' + month;
    
      var day = date.getDate().toString();
      day = day.length > 1 ? day : '0' + day;
      
      return year + '-' + month + '-' + day;
    }
    const formattedDate=getFormattedDate(date)


    const viewOrder= async ()=>{
      const res = await axios.get("http://localhost:5000/api/viewOrder").
      catch(err=>{
        console.log(err)
      })
      const data = await res.data;
      return data;
  }
  useEffect(()=>{
    viewOrder().then((data)=>{
      setOrderedData(data.order);
    })    
}

,[])

   const managedByshop= shopData.map(x=>{
    return x.managedby
   }) 

   const managed = managedByshop.map(x=>{
    return x._id
   })
   const onlyOrder=managed.filter(x=>x===email)
    // console.log("orderedData ha",orderedData);
    const shopFilter= shopData.filter(x=>{
     return x?.managedby?._id===id
    })
    const shopId=shopFilter.map(x=>x?._id)
    console.log("shop filter ha",shopFilter)
    const idSHOP=JSON.stringify(shopId)
    console.log("siingle id ha",idSHOP)
    const filteredOrder=orderedData.filter(x=>x.date.substring(0,10)===formattedDate);
    console.log("filtered data is",filteredOrder)

    return (<>
   { showOrderDetails &&  <OrderDetails onClose={hideOdetails} orderedDetails={orderedDetails} orderedData={orderedData}/>}
    {!showOrderDetails &&  <div className="orders__bgidv">
        <div className="orders__maindiv">
            <h2>Orders</h2>
            <p>List of Your orders are given below</p>
            <div className="orders__datediv">
            <span className="orders__selectdate">Select date:</span>
      <DatePicker 
       calendarAriaLabel="Toggle calendar"
            clearAriaLabel="Clear value"
            dayAriaLabel="Day"
            monthAriaLabel="Month"
            nativeInputAriaLabel="Date"
      onChange={onChange} value={date} />
    </div>

    <Table striped bordered hover >
      <thead>
        <tr>
          <th>Date</th>
          <th>Order By</th>
          <th>Total</th>
          <th>Payment Method</th>
          <th>Shop Name</th>
          <th>More</th>
        </tr>
      </thead>
     { filteredOrder.filter(y=>{
      console.log("Filtedered order ki len hg",filteredOrder.length)
      if(role==="manager" && shopFilter.map(x=>x._id).includes(y.shop._id)){
        return y;
      }
      else if(role==="admin") {
        console.log("y ki length ha",y)
        return y;
        
      }


     }

     
     
    )
    
    
     .map(x=>{
      {/* console.log("orded data ha",x.date) */}
    
     return (
      <>
      {x===null && <p>No orde rye</p>}
      {filteredOrder.length===0 && <p>You dnt have an order yet</p>}
      <tbody key={x._id}>
        <tr>
          <td>{x.date.substring(0,10)}</td>
          <td>{x.givenBy.email}</td>
          <td>${x.totalPrice}</td>
          <td>{x.payment}</td>
          <td>{x.shop.name}</td>
          <td><VisibilityOutlinedIcon className="order__viewIcon" onClick={()=>showOdetails(x._id)}/></td>
        </tr>
      
      </tbody>
      </>
     )})
     
     }
    </Table>
 


        </div>
    </div>}
    </>)
}
export default Order;