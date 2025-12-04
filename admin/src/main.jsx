
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import AuthContext from "./context/AuthDataContext.jsx";
//import  {UserProvider}  from "./context/UserContext.jsx";
import {AdminProvider}  from "./context/AdminDataContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
 <AuthContext>
  <AdminProvider>


      <BrowserRouter>
        <App />
      </BrowserRouter>
        </AdminProvider>

  </AuthContext>
);
