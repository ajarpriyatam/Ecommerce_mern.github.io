import React from 'react';
import { Link } from 'react-router-dom';
import "./home.css";

const Productcard=({product}) =>{
    let productname= product.name
    if(productname.length > 45){
        productname = `${productname.slice(0,45)}...`
    }
    console.log(product,"ajar");
    return (
    <>
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.url} alt={productname} />
      <div className='head'>
        <div className='heading'>
          <h4>{productname}</h4>
          <h3>{product.category}</h3>
          <h4><span>{`₹${product.price}`}</span></h4>
          <p>Free Delivery</p>
        </div>
      </div>
    </Link>
    </>
  )
}

export default Productcard;