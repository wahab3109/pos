import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
export const ProtectedRoute = () => {
    const userRole=localStorage.getItem("userRole")
console.log("protected Route me user ka role ha,",userRole)

    return (userRole==="admin" || userRole==="manager" ) ? <Outlet /> : <Navigate to="/register" />
}

