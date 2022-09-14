import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../main.js";
import "./orderList.css";

import {
  getAllOrders,
  clearErrors,
} from "../../actions/orderAction";

const OrderList = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, orders } = useSelector((state) => state.allOrders);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllOrders());
  }, [dispatch, alert, error, history]);
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "UserId",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "date_time",
      headerName: "Date & Time",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },
    {
      field: "quantity",
      flex: 0.3,
      headerName: "Quantity",
      minWidth: 150,
      type: "number",
      sortable: false,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      let x = item.createdAt
      let date_time = x.split("T")
      let date = date_time[0]
      let time = date_time[1].split(".")[0]
      rows.push({
        id: item._id,
        date_time:`${date} | ${time}`,
        amount: item.totalPrice,
        quantity:item.quantity,
        status: item.user,
      });
    });
  console.log(orders,rows,"rows")
  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />
      <div className="dashboard">
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;