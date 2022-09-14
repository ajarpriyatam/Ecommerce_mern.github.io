import React, { Fragment, useEffect } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../main.js";
import { Link } from "react-router-dom";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import { useAlert } from "react-alert";
import { useParams } from 'react-router-dom';

const OrderDetails = ({match}) => {
  const { id } = useParams();
  const {color,loading,totalPrice,size,orderId,quantity,itemPrice,itemOrder,orderTime,orderStatus} = useSelector(state => state.orderDetails);
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch,id]);
  const Url = "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg"
  return(
    <Fragment>
          <MetaData title="Order Details" />
          {itemOrder &&
          <div className="container6">
          <p className="para1">order #{orderId}</p>
          <div className="container1">
              <p className="para2">Order Status</p>
              <p className="para3">Status : <span className="para4">{orderStatus}</span></p>
              <p className="para2">Order Details</p>
              <p className="para3">Order Date  : <span>{orderTime}</span></p>
              {itemOrder &&
                itemOrder.map((item) => (
                  <p className="para3">Product Name : <span>{item.name} || {item.category}</span></p>
                ))}
              <p className="para3">Color : <span className="para4">{color}</span></p>
              <p className="para3">Size : <span className="para4">{size}</span></p>
              <p className="para3">Quantity : <span>{quantity}</span></p>
              <p className="para3">Price : <span>{itemPrice}</span></p>
              <div>
                  <p className="para2">Payment</p>
                  <p className="para3">
                  {itemOrder &&
                  itemOrder.map((item) => (
                    <div className="container2">
                      <img className="img" src={item.url} alt="Product" />
                      <div className="container5">
                      <Link to={`/product/${item._id}`}>
                        <p className="para6">{item.name}</p>
                      </Link>
                      </div>
                      <div className="container4">
                      <span className="para5">
                        {quantity} X ₹{item.price} ={" "}
                        <b>₹{totalPrice}.00</b>
                      </span>
                      </div>
                    </div>
                    ))}
                  </p>
              </div>
              <div className="container3">
                  <h2 className="para7">Grand Total   :   <span>₹{totalPrice}</span></h2>
              </div>
          </div>
        </div> 
          }
          
          
    </Fragment>
  )
}

export default OrderDetails;