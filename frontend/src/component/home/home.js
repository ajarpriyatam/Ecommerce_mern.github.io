import React, {Fragment,useEffect}from "react";
import "./home.css";
import ProductCard from "./productCard.js";
import MetaData from "../main.js";
import {getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";


const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state)=>state.products.products)
  const productCount = useSelector((state)=>state.products.productsCount)
  console.log(products,productCount,"prince",typeof(products))
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);
  return (
    <Fragment>
          <MetaData title="ECOMMERCE" />
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
  );
};
export default Home;