import './App.css';
import { useEffect } from "react";
import { BrowserRouter ,Route, Routes} from "react-router-dom";
import Footer from './component/footer/footer';
import Header from './component/header/header';
import { loadUser } from'./actions/userAction.js'
import Home from './component/home/home';
import store from './store.js'
import ProductDetails from './component/product/productDetails';
import OrderSuccess from"./component/order/OrderSuccess";
import MyOrders from './component/order/myorder';
import LoginSignUp from './component/user/signup';
import Account from './component/user/account';
import OrderDetails from './component/order/orderdetails';
import NewProduct from './component/admin/NewProduct';
import UpdateProfile from './component/user/updateProfile';
import OrderList from './component/admin/OrderList';
import NotFound from './component/NotFound';
import ChangePassword from './component/user/ChangePassword';
import ForgotPassword from './component/user/ForgotPassword';
import ResetPassword from './component/user/ResetPassword';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/product/:id" element={<ProductDetails />}/>
      <Route path="/order/success" element={<OrderSuccess />}/>
      <Route path="/orders" element={<MyOrders />}/>
      <Route path="/signup_signin" element={<LoginSignUp />}/>
      <Route path="/account" element={<Account/>}/>
      <Route path="/order/:id" element={<OrderDetails/>}/>
      <Route path="/admin/product/new" element={<NewProduct/>}/>
      <Route path="/my/update" element={<UpdateProfile/>}/>
      <Route path="/admin/orders" element={<OrderList/>}/>
      <Route path="/password/update" element={<ChangePassword/>}/>
      <Route path="/password/forgot" element={<ForgotPassword/>}/>
      <Route path='/password/reset/:token' element={<ResetPassword />}/>
      <Route path='*'
          element={ window.location.pathname === "/process/payment" ? null : 
            <NotFound/>
          } 
          />
    </Routes>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
