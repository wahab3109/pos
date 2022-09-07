import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
export const StaffProtectedRoute = () => {
    const userRole=localStorage.getItem("userRole")
console.log("protected Route me user ka role ha,",userRole)

    return (userRole==="admin" || userRole==="manager" || userRole==="staff") ? <Outlet/> : <Navigate to="/register" />
}

