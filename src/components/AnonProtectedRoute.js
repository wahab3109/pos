import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Register from './register/register';
export const AnonProtectedRoute = (children) => {
    const userRole=localStorage.getItem("userRole")
console.log("anon proected Route me user ka role ha,",userRole)

    if (!userRole==="admin" || !userRole==="manager" || !userRole==="staff") {
        return children;
    }
    else{
       return <Navigate to="/home/products"/>
    }
}

