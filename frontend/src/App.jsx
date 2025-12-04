import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Nav from "./components/Nav";
import Registeration from "./pages/Registeration";
import Login from "./pages/Login";
import OtpVerification from "./pages/OtpVerification";
import ReportNew from "./complaint/ReportNew";
import About from "./pages/About";

import ProfileSetting from "./pages/ProfileSetting";
import Download from "./pages/Download";
import ContactInfo from "./pages/ContactUs";
import NotFound from "./pages/NotFound";
import Certificate from "./pages/Cerificate";

import { ToastContainer } from "react-toastify";

import ProtectedRoute from "./route/ProtectedRoute";
import PublicRoute from "./route/PublicRoute";
import ViewAllIssues from "./pages/ViewAllIssues";

const App = () => {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/register"
          element={
           
              <Registeration />
           
          }
        />
        <Route
          path="/login"
          element={
          
              <Login />
           
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/otpverification" element={<OtpVerification />} />

        <Route
          path="/Report-an-Issue"
          element={
            <ProtectedRoute>
              <ReportNew />
            </ProtectedRoute>
          }
        />
        <Route
          path="/nav"
          element={
            <ProtectedRoute>
              <Nav />
            </ProtectedRoute>
          }
        />
    
        <Route
          path="/profilesetting"
          element={
            <ProtectedRoute>
              <ProfileSetting />
            </ProtectedRoute>
          }
        />
        <Route
          path="/download"
          element={
            <ProtectedRoute>
              <Download />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ViewAllIssues"
          element={
            <ProtectedRoute>
              <ViewAllIssues />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contactinfo"
          element={
            <ProtectedRoute>
              <ContactInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />

        <Route
          path="/certificate"
          element={
            <ProtectedRoute>
              <Certificate
                userName={location.state?.userName}
                issue={location.state?.issue}


              />

            </ProtectedRoute>

          }
        />

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default App;
