import React, { Fragment } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./OrderSuccess.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import MetaData from "../main.js";

const OrderSuccess = () => {
  return (
    <Fragment>
      <MetaData title="order_success_"/>
    <div className="orderSuccess">
      <CheckCircleIcon />
      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
    </Fragment>
  );
};

export default OrderSuccess;