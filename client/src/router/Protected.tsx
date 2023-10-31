import { ReactNode, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext, AuthContextType } from "../context/AuthContext";


export const ProtectedRoute = ({children}:any) => {
  const { isLoggedIn } = useContext(AuthContext) as AuthContextType;
  const isLogin = localStorage.getItem("token") || isLoggedIn ? true : false
  if(isLogin){
    return children
  }
  return <Navigate to="/login"/>;

};

export const ProtectedAuthRoute = ({children}:any) => {
    const { isLoggedIn } = useContext(AuthContext) as AuthContextType;
    const isLogin = localStorage.getItem("token") || isLoggedIn ? true : false
    if(!isLogin){
        return children
    }

    return <Navigate to="/tasks"/>;
  
  };