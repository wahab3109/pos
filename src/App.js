import './App.css';
import { useEffect, useState } from 'react';
import Register from './components/register/register';
import {BrowserRouter,Navigate,Route, Routes} from "react-router-dom";
import axios from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import Order from './components/orders/orders';
import Main from './components/main/main';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Store from './components/Store/store';
import Dashboard from './components/dashboard/dashboard';
import { userActions } from './store/role-slice';
import Shop from './components/products/shop';
import Login from './components/login/login';
import Items from './components/items/items';
import Team from './components/team/teams';
import Welcome from './components/Welcome/welcome';
import { ProtectedRoute } from './components/protectedRoute';
import { StaffProtectedRoute } from './components/staffProtectedRoute';
import Rechart from './components/main/rechart';
import { AnonProtectedRoute } from './components/AnonProtectedRoute';

function App() {
  console.log("App is runnig")
  // const[check,setCheck]=useState();
  // const [role,setRole]=useState()

  // useEffect(()=>{
  //   setRole((localStorage.getItem("userRole")))
  //   console.log("adpp me role ha",role)

  // },[])
  
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
    <Route exact path="/" element={ <Navigate to="register" />}>
</Route>
    <Route path='/home'  element={<Main/>}>
    <Route path='chart'  element={<Rechart/>}/>


    <Route path="welcome" element={<Welcome/>}/>
    {/* <Route path="dashboard"  element={(role==="admin" || role==="manager")? <Dashboard/> : <Navigate to="/register"/>}/> */}

    <Route element={<ProtectedRoute/>}>
      <Route path="dashboard" element={<Dashboard/>}></Route>
     
      <Route path="items" element={<Items/>}></Route>
      <Route path="store" element={<Store/>}></Route>
      <Route path="team" element={<Team/>}></Route>
      <Route path="orders" element={<Order/>}></Route>
      </Route>
    
    <Route element={<StaffProtectedRoute/>}>
    <Route path="products" element={<Shop/>}></Route>
    </Route>
    </Route>

   <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    </Routes>
  
    </BrowserRouter>
 
    </div>
  );
}

export default App;
