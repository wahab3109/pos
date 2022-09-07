import React,{useEffect,useState} from "react";
import "./main.css"
import { Link,NavLink } from "react-router-dom";
import Shop from "../products/shop";
import Charts from "./chart";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/role-slice";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Dashboard from "../dashboard/dashboard";
import {BrowserRouter,Route, Routes,Params, useParams} from "react-router-dom";
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import { useNavigate } from "react-router-dom";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Outlet } from "react-router-dom";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useSelector } from "react-redux";
import  axios from 'axios';
import DoneModal from "../ui/toasts/doneModal";
axios.defaults.withCredentials=true;


const Main = (props)=>{
  const dispatch=useDispatch()

    const params=useParams;
    const history=useNavigate();
    const role = useSelector(state=>state.userData.role);
    const fname = useSelector(state=>state.userData.fname);
    const lname = useSelector(state=>state.userData.lname);
    const orderModal=useSelector(state=>state.modal.modalState)
    // const [orderDelivered,setOrderDelivered]=useState(orderModal);


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
        localStorage.setItem("userRole","")
        history("/register")
  
      })
    }
    useEffect(()=>{
      fetchUserData().then((data)=>{
        dispatch(userActions.addUserData({
          role:data.user.role,
          fname:data.user.fname,
          lname:data.user.lname,
          email:data.user.email,
          _id:data.user._id,
        }));
        localStorage.setItem("userRole",data.user.role)
        
      })
    },[])

    const fetchUserData = async()=>{
      const res = await axios.get("http://localhost:5000/api/user",{
        withCredentials:true
      }).catch(err=>{
        console.log(err)
      })
      const data = await res.data;
      return data;
    }
    

    return (<>

    {orderModal && <DoneModal title="order Submitted"/>}  
    <div className="main__bgdiv">
        <div className="main__maindiv">

            <div className="main__leftsidebar">
                
                <Navbar bg="light" expand="lg" className="navbbar">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        
          <Nav className="me-auto nav__flex">

          <Nav.Link>  <div className="main__leftsidebar__data">
                    <p>{fname}</p>
                    <p>{lname}</p>
                </div>
                <h3 className="main__leftsidebar__role">{role}</h3></Nav.Link>

                {(role==="admin" || role==="manager") && <Nav.Link>   <NavLink className="main__link"  activeclassname="active" to="/home/dashboard">
                <div className="main__leftsidebar__menu"> 
                <DashboardCustomizeOutlinedIcon className="main__leftsidebar__icons"/>
                <h2>Dashboard</h2>
                </div>
                </NavLink>
                </Nav.Link>
               }
               {(role==="admin" || role==="manager" || role==="staff") &&
            <Nav.Link ><NavLink  activeclassname="active" className="main__link" to="/home/products"><div className="main__leftsidebar__menu">
                <ProductionQuantityLimitsOutlinedIcon  className="main__leftsidebar__icons"/>
                <h2>Products</h2>
                </div>
                </NavLink></Nav.Link>}
                {role==="admin" &&  <Nav.Link >     <NavLink className="main__link" to="/home/team"  activeclassname="active">
                <div className="main__leftsidebar__menu">
                <SupportAgentOutlinedIcon  className="main__leftsidebar__icons"/>
                <h2>Team</h2>
                </div>
                </NavLink>
              </Nav.Link>}

              {(role==="admin"  || role==="manager") && <Nav.Link >  
                <NavLink  activeclassname="active" className="main__link" to="/home/store">
                <div className="main__leftsidebar__menu">
                <HomeOutlinedIcon   className="main__leftsidebar__icons"/>
                <h2>Stores</h2>
                </div>
                </NavLink>
              </Nav.Link>}
              {  (role==="admin" || role==="manager") && <Nav.Link> 
                <NavLink  activeclassname="active" className="main__link" to="/home/orders">
                <div className="main__leftsidebar__menu" >
                <ShoppingCartOutlinedIcon  className="main__leftsidebar__icons"/>
                <h2>Orders</h2>
                </div>
                </NavLink>
                </Nav.Link>
              }
              {(role==="admin" || role==="manager") && <Nav.Link >   
                <NavLink  activeclassname="active" className="main__link" to="/home/items">
                <div className="main__leftsidebar__menu">
                <CategoryOutlinedIcon className="main__leftsidebar__icons"/>
                <h2>Items</h2>
                </div>
                </NavLink>
                </Nav.Link>
              }
              <Nav.Link >   
                <div className="main__leftsidebar__menu">
                <LogoutOutlinedIcon className="main__leftsidebar__icons"/>
                <h2 onClick={logoutHandler}>Logout</h2>
                </div></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
            </div>
            <div className="main__rightsidebar">
            <Outlet/>
            </div>


            
        </div>
       
    </div>
    {/* <Charts/> */}
  
    </>)
}
export default Main;