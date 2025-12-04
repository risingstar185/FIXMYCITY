import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";


import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Sidebar from "./pages/Sidebar";
import List from "./pages/UserIsues";
import Pending from "./pages/Pending";



const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
          
              <Login />
           
          }
        />
         <Route
          path="/sidebar"
          element={
          
              <Sidebar />
           
          }
        />
          <Route
          path="/"
          element={
          
              <Home />
           
          }
        />
        
         <Route
          path="/Pending"
          element={
          
              <Pending />
           
          }
        />
          <Route
          path="/list"
          element={
          
              <List />
           
          }
        />

    

      
      </Routes>

      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default App;
