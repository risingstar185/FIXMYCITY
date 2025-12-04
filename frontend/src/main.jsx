
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import AuthContext from "./context/AuthContext.jsx";
import  {UserProvider}  from "./context/UserContext.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
 <AuthContext>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </AuthContext>
);
