import React,{useState,useEffect} from "react"
import {Radar} from "../main/chart"
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Charts from "../main/chart";
import SearchIcon from '@mui/icons-material/Search';
import "./dashboard.css"
import "../main/main.css"
import  axios from 'axios';
import Rechart, { AreaRechart } from "../main/rechart";

axios.defaults.withCredentials=true;
const Dashboard = ()=>{
  const history = useNavigate();
    const[name,setName]=useState()
    const [orderedData,setOrderedData]=useState([{
      _id:"",
      items:[],
      givenBy:"",
      totalPrice:"",
      payment:"",
      itemData:[],
      date:""
    }])
    const totalSales=[];
    orderedData.map(x=>{
      totalSales.push(parseFloat(x.totalPrice));
    })
    const total=  (parseFloat(totalSales.reduce((a, b) => a + b, 0))).toFixed(2)
    const totalNumberSales=orderedData.length;
    // last 10 sales
    const lastTenSales=orderedData.slice(-10)
    // yesterday dates
    var yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
var now_utc = Date.UTC(yesterdayDate.getUTCFullYear(), yesterdayDate.getUTCMonth(),
yesterdayDate.getUTCDate(), yesterdayDate.getUTCHours(),
yesterdayDate.getUTCMinutes(), yesterdayDate.getUTCSeconds());
const yesterdayDateUtc=yesterdayDate.toISOString();
    const yesterdayOrders=orderedData.filter(x=>x.date.substring(0,10)===yesterdayDateUtc.substring(0,10));

    var totalYesSales=[];
    yesterdayOrders.map(x=>{
      totalYesSales.push(parseFloat(x.totalPrice));
    })
     totalYesSales=  (parseFloat(totalYesSales.reduce((a, b) => a + b, 0))).toFixed(2)
    const totalyesOrders=yesterdayOrders.length;
     //today sales
     var todayDate = new Date();
     todayDate.setDate(todayDate.getDate());
var now_utc = Date.UTC(todayDate.getUTCFullYear(), todayDate.getUTCMonth(),
todayDate.getUTCDate(), todayDate.getUTCHours(),
todayDate.getUTCMinutes(), todayDate.getUTCSeconds());
const todayDateUtc=todayDate.toISOString();
    const todayOrders=orderedData.filter(x=>x.date.substring(0,10)===todayDateUtc.substring(0,10));
    var todaySales=[];
    // console.log("today data ies",todayDateUtc)
    todayOrders.map(x=>{
      todaySales.push(parseFloat(x.totalPrice));
    })
    todaySales=  (parseFloat(todaySales.reduce((a, b) => a + b, 0))).toFixed(2)
    const totalTodayOrders=todayOrders.length;
    //2 days before

    var twodaysDate = new Date();
    twodaysDate.setDate(twodaysDate.getDate() -2);
var now_utc = Date.UTC(twodaysDate.getUTCFullYear(), twodaysDate.getUTCMonth(),
twodaysDate.getUTCDate(), twodaysDate.getUTCHours(),
twodaysDate.getUTCMinutes(), twodaysDate.getUTCSeconds());
const twodayDateUtc=twodaysDate.toISOString();
   const twodaysOrder=orderedData.filter(x=>x.date.substring(0,10)===twodayDateUtc.substring(0,10));
  //  console.log("2days  orders are",twodaysOrder)
   var towdaysTotalSales=[];
   twodaysOrder.map(x=>{
    towdaysTotalSales.push(parseFloat(x.totalPrice));
   })
   towdaysTotalSales=  (parseFloat(towdaysTotalSales.reduce((a, b) => a + b, 0))).toFixed(2)
   const twodaysOrderlength=todayOrders.length;

   //3days order
   var threedaysDate = new Date();
   threedaysDate.setDate(threedaysDate.getDate() -3);
var now_utc = Date.UTC(threedaysDate.getUTCFullYear(), threedaysDate.getUTCMonth(),
threedaysDate.getUTCDate(), threedaysDate.getUTCHours(),
threedaysDate.getUTCMinutes(), threedaysDate.getUTCSeconds());
const threedayDateUtc=threedaysDate.toISOString();
   const threedaysOrder=orderedData.filter(x=>x.date.substring(0,10)===threedayDateUtc.substring(0,10));
   var threedaysTotalSales=[];
   threedaysOrder.map(x=>{
    threedaysTotalSales.push(parseFloat(x.totalPrice));
   })
   threedaysTotalSales=  (parseFloat(threedaysTotalSales.reduce((a, b) => a + b, 0))).toFixed(2)
   const threedaysOrderlength=threedaysOrder.length;
   

   //4days order
   var fourdaysDate = new Date();
   fourdaysDate.setDate(fourdaysDate.getDate() -4);
var now_utc = Date.UTC(fourdaysDate.getUTCFullYear(), threedaysDate.getUTCMonth(),
fourdaysDate.getUTCDate(), fourdaysDate.getUTCHours(),
fourdaysDate.getUTCMinutes(), fourdaysDate.getUTCSeconds());
const fourdayDateUtc=fourdaysDate.toISOString();
   const fourdaysOrder=orderedData.filter(x=>x.date.substring(0,10)===fourdayDateUtc.substring(0,10));
   var fourdaysTotalSales=[];
   fourdaysOrder.map(x=>{
    fourdaysTotalSales.push(parseFloat(x.totalPrice));
   })
   fourdaysTotalSales=  (parseFloat(fourdaysTotalSales.reduce((a, b) => a + b, 0))).toFixed(2)
   const fourdaysOrderlength=fourdaysOrder.length;
   

   var fivedayssales=[parseFloat(fourdaysTotalSales),parseFloat(threedaysTotalSales),parseFloat(towdaysTotalSales),parseFloat(todaySales),parseFloat(totalYesSales)];
   fivedayssales=  (parseFloat(fivedayssales.reduce((a, b) => a + b, 0))).toFixed(2)
   var fivedaysorderlen=[fourdaysOrderlength,twodaysOrderlength,threedaysOrderlength,totalTodayOrders,totalyesOrders]
   const fivedayslen=fivedaysorderlen.reduce((a, b) => a + b, 0);
//    const fivedayslen = fivedaysorderlen.reduce(add, 0);   
// function add(accumulator, a) {
//   return accumulator + a;
// }
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
      setOrderedData(data.order)
    })    
}

,[])  

// console.log("orderedDatais",orderedData)
  
  const logoutFunction = async ()=>{
    const res = axios.get("http://localhost:5000/api/logout",null,{
      withCredentials:true
    }).catch(err=>{
      console.log(err)
    })
    const data = await res.data;
    return data
  }
  const logoutHandler=()=>{
    logoutFunction().then(()=>{
      history("/register")

    })
  }
    return(<>
    {name && <h1>{name.fname}</h1>}
    <div className="dashboard__bgdiv">
 
                <div className="main__salesandtotaldiv">
       <div className="main__today_yesterday">
                <div className="main__todayspecific">
                    <div className="main__todayandnumber">
                        <span>Today</span>
                        <p className="main__numberspan">{totalTodayOrders}</p>

                    </div>
                    <p>${todaySales}</p>
                </div>
                <div className="main__todayspecific">
                    <div className="main__todayandnumber">
                        <span>Yesterday</span>
                        <p className="main__numberspan">{totalyesOrders}</p>

                    </div>
                    <p>${totalYesSales}</p>
                </div>
                <div className="main__todayspecific">
                    <div className="main__todayandnumber">
                        <span>5 days</span>
                        <p className="main__numberspan">{fivedayslen}</p>

                    </div>
                    <p>${fivedayssales}</p>
                </div>
                <div className="main__todayspecific">
                    <div className="main__todayandnumber">
                        <span>7 days</span>
                        <p className="main__numberspan">{fivedayslen}</p>

                    </div>
                    <p>${fivedayssales}</p>
                </div>
               
                </div>
                <div className="main__totalsales">
                    <div className="main__totalsalesandnum">
                        <span>Total sales</span>
                        <p className="main__numberspan">{totalNumberSales}</p>

                    </div>
                    <p>${total}</p>
                </div>
                </div>
            <div className="rightsidebar__chartdiv">
            <div className="lineChartdiv">
            <div className="lineChartcenterdiv">
             <Rechart 
            
              todays={todaySales} todayl={totalTodayOrders} yesterdays={totalYesSales} yesterdayl={totalyesOrders} twodayss={towdaysTotalSales} twodaysl={twodaysOrderlength} threedayss={threedaysTotalSales} threedaysl={threedaysOrderlength} fourdayss={fourdaysTotalSales} fourdaysl={fourdaysOrderlength}
            />  
            </div> 
            </div>
            <div className="graphchartdiv">
            <AreaRechart 
           
               todays={todaySales} todayl={totalTodayOrders} yesterdays={totalYesSales} yesterdayl={totalyesOrders} twodayss={towdaysTotalSales} twodaysl={twodaysOrderlength} threedayss={threedaysTotalSales} threedaysl={threedaysOrderlength} fourdayss={fourdaysTotalSales} fourdaysl={fourdaysOrderlength}
            />
            </div>

            </div>
            <div className="rightsidebartablediv">
            <div className="Headingdiv">
            <h4 >Last 10 sales</h4>
              </div>
            <Table responsive  border hover>
      <thead>
        <tr>
          <th>SI</th>
          <th>Total</th>
          <th>Givenby</th>
          <th>Date</th>
        </tr>
      </thead>
    {lastTenSales.map(x=>{
      return (
        <tbody key={x._id}> 
        <tr>
          <td>{x._id}</td>
          <td>${x.totalPrice}</td>
          <td>{x.givenBy.email}</td>
          <td>{x.date?.substring(0,10)}</td>
        </tr>
        </tbody>
      )
    })}
      
        </Table>
          
            </div>


</div>

    </>)
}
export default Dashboard;