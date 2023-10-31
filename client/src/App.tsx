import React, { useContext, useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import {  Route, Routes } from "react-router-dom";
import NotFound from "./utils/NotFound";
import NavBar from "./components/NavBar";
import { AuthContext, AuthContextType } from "./context/AuthContext";
import TaskForm from "./components/TaskForm";
import { ProtectedAuthRoute, ProtectedRoute } from "./router/Protected";

function App() {
  const { isLoggedIn } = useContext(AuthContext) as AuthContextType;
  console.log(isLoggedIn)
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<ProtectedAuthRoute><LoginForm /></ProtectedAuthRoute>} />
        <Route path="/login" element={<ProtectedAuthRoute><LoginForm/></ProtectedAuthRoute>} />
        <Route path="/signup" element={<ProtectedAuthRoute><SignupForm /></ProtectedAuthRoute>} />
        <Route path='/tasks' element={<ProtectedRoute><TaskList /></ProtectedRoute>} />
        <Route path='/tasks/form' element={<ProtectedRoute><TaskForm /></ProtectedRoute>} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

