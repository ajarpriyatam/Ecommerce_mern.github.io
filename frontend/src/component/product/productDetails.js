import React, { Fragment, useEffect, useState} from "react";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import {
  clearErrors,
  getProductDetails,
} from "../../actions/productAction";
import {
  createOrder,
} from "../../actions/orderAction";

import MetaData from "../main.js";
import {useAlert} from 'react-alert';

const ProductDetails =({match})=>{
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { user,isAuthenticated } = useSelector((state) => state.user);
    const { product, loading, error } = useSelector((state) => state.productDetails);
    const [quantity, setQuantity] = useState(1);
    const increaseQuantity = () => {
      if (product.stock <= quantity) return;
      const qty = quantity + 1;
      setQuantity(qty);
    };
    const decreaseQuantity = () => {
      if (1 >= quantity) return;
      const qty = quantity - 1;
      setQuantity(qty);
    };
    const [proper, setProper] = useState({
      quantity: quantity,
      size: "",
      color: "",
    });
    const {size,color } = proper;
    const submitdata = (e) => {
      e.preventDefault();
      const product_data=[{
        "name":product.name,
        "category":product.category,
        "price":product.price,
        "_id":id
      }]
      const myForm = {
        "size":size,
        "quan":quantity,
        "color":color,
        "orderItems":product_data,
        "itemprice":product.price,
        "totalprice":product.price*quantity
      }
      if(user){
        dispatch(createOrder(myForm));
        navigate("/order/success")
      }
      else{
        navigate("/signup_signin")
      }
    };
  
    const registerDataChange = (e) => {
        setProper({ ...proper, [e.target.name]: e.target.value });
    };
    useEffect(() => {
      if(error){
         alert.error(error);
         dispatch(clearErrors())
      }
      dispatch(getProductDetails(id));
      }, [dispatch,id,error,alert]);
    return(
        <Fragment>
          <MetaData title={`${product.name} || ECOMMERCE`} />
          <div className="ProductDetails">
            <div className="ProductDetail1">
              <img src={product.url} alt={product.name}/>
            </div>
            <div className="ProductDetails1">
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
              </div>
              
              <div className="detailsBlock-2">
              <span>{product.category}</span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                
                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-5">
                  <div className="detailsBlock-3-1">
                      <div className="detailsBlock-3-1-1">
                        <button onClick={decreaseQuantity}>-</button>
                        <input readOnly type="number" value={quantity}/>
                        <button onClick={increaseQuantity}>+</button>   
                      </div>
                  </div>
                  <form className="detailsBlock5"  encType="multipart/form-data" onSubmit={submitdata}>
                      <div className="detailsBlock-51">
                          <div className="detailsBlock-5-1">
                          <label for="size">Size : </label>
                          <select id="size" name="size"   onChange={registerDataChange}>
                            <option value="M">Select</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                          </select>
                          </div>
                          <div className="detailsBlock-5-2">
                          <label for="color">Color : </label>
                          <select id="color" name="color"   onChange={registerDataChange}>
                          <option value="M">Select</option>
                            <option value="Red">Red</option>
                            <option value="Yellow">White</option>
                            <option value="Blue">Gray</option>
                            <option value="Green">Blue</option>
                            <option value="Black">Black</option>
                            <option value="Black">Cream</option>
                            <option value="Black">Green</option>
                          </select>
                          </div>
                      </div>
                      <input
                      type="submit"
                      value="Buy Now!"
                      className="buyBtn1"
                      />
                  </form>
                  
              </div>
              <div className="detailsBlock-4">
                Description :
                <p className="para">{product.description}</p>
              </div>
            </div>
          </div>
        </Fragment>
            
    )
}
export default ProductDetails;