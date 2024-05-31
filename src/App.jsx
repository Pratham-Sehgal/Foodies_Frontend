import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-blackbox.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import "../node_modules/bootstrap/dist/js/bootstrap.esm"
import Signup from "./Pages/Signup";
import { CartProvider } from "./components/ContextReducer";
import MyOrder from "./Pages/MyOrder";
function App() {
  
  return (
    
   <CartProvider>
    
    <Router>
      <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/createUser" element={<Signup/>}></Route>
        <Route path="/myOrder" element={<MyOrder/>}></Route>
      </Routes>
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
