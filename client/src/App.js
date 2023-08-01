import About from "./components/About";
import Contact from "./components/Contact";
import NavBar from "./components/NavBar";
import Policy from "./components/Policy";
import TopBar from "./components/TopBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import Register from "./screens/Register";
import Login from "./screens/Login";
import OrderScreen from "./screens/OrderScreen";
import AdminScreen from "./screens/AdminScreen";
import Pizzaslist from "./components/Admin/Pizzaslist";
import Userlist from "./components/Admin/Userlist";
import Orderlist from "./components/Admin/Orderlist";
import AddNewPizza from "./components/Admin/AddNewPizza";
import EditPizza from "./components/Admin/EditPizza";

function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <NavBar />
      <Routes>
      <Route path="/" Component={HomeScreen} exact />
      <Route path="/orders" Component={OrderScreen} exact />
      <Route path="/login" Component={Login} exact />
      <Route path="/register" Component={Register} exact />
      <Route path="/cart" Component={CartScreen} exact />
      <Route path="/contact" Component={Contact} exact />
      <Route path="/policy" Component={Policy} exact />
      <Route path="/about" Component={About} exact />
      <Route path="/admin" Component={AdminScreen}/>
        <Route path="/admin/pizzalist" Component={Pizzaslist} exact/>
        <Route path="/admin/editpizza/:pizzaId" Component={EditPizza} exact/>
        <Route path="/admin/userlist" Component={Userlist} exact/>
        <Route path="/admin/orderlist" Component={Orderlist} exact/>
        <Route path="/admin/addnewpizza" Component={AddNewPizza} exact/>
      
       
 

      </Routes>

      {/* <Route path='/about' Component={About} /> */}
    </BrowserRouter>
  );
}

export default App;
