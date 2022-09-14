import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../main.js";
import { Link,useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { logout ,deleteuser, deleteUser } from "../../actions/userAction";
import "./account.css";
import { useAlert } from "react-alert";

const Account = ({ history }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    if(isAuthenticated == undefined){
      navigate("/login");
    }
  }, [history, isAuthenticated,navigate]);
  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
    navigate("/login")
  }
  function deleteuser() {
    dispatch(deleteUser());
    alert.success("Delete User Successfully");
    navigate("/")
  }
  let UserAdmin = "My Orders";
  let UserAdmin_url = "/orders";
  let x_url = "";
  if(user.role == "admin"){
    UserAdmin="Create Product"
    UserAdmin_url = "/admin/product/new"
    x_url = <Link to="/admin/orders">All Order</Link>
  }else{
    x_url = <Button onClick={deleteuser} className="delete">Delete Account</Button>
  }
  function logoutUser() {
    dispatch(logout());
    navigate("/")
    alert.success("Logout Successfully");
  }
  
  
  return (
    <Fragment>
    <MetaData title={`${user.name}'s Profile`} />
    <div className="profileContainer">
      <div>
        <h1>My Profile</h1>
        <img src={user.avatar.url} alt={user.name} />
        <Link to="/my/update">Edit Profile</Link>
        <Button onClick={logoutUser}  className="logout">Logout</Button>
      </div>
      <div >
        <div >
          <h4 className="account1">Full Name</h4>
          <p>{user.name}</p>
        </div>
        <div>
          <h4 className="account1">Email</h4>
          <p>{user.email}</p>
        </div>
        <div>
          <h4 className="account1">Phone No.</h4>
          <p>{user.phone}</p>
        </div>
        <div>
          <h4 className="account1">Joined On</h4>
          <p>{String(user.createdAt).substr(0, 10)}</p>
        </div>
        
        <div>
          <Link to={UserAdmin_url}>{UserAdmin}</Link>
          <Link to="/password/update">Change Password</Link>
          {x_url}
        </div>
      </div>
    </div>
  </Fragment>
  );
};

export default Account;