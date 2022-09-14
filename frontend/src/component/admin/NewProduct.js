import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import Button from '@mui/material/Button';
import LinkIcon from '@mui/icons-material/Link';
import MetaData from "../main.js";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { NEW_PRODUCT_RESET } from "../../constant/productConstant";
import { useNavigate } from "react-router-dom";

const NewProduct = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate()
  const {error, success } = useSelector((state) => state.newProduct);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const categories = [
    "T-shirt",
    "Shirt",
    "Jeans",
    "Pant",
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Product Created Successfully");
      navigate("/");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, history, success,navigate]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = {
        "name": name,
        "price":price,
        "description":description,
        "category":category,
        "stock":Stock,
        "url":url
    };
    console.log(myForm,"jhu");
    dispatch(createProduct(myForm));
  };
  
  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <DescriptionIcon />
              <input
                type="text"
                placeholder="Description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div>
              <LinkIcon/>
              <input
                type="text"
                placeholder="Image Url"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <Button
              id="createProductBtn"
              type="submit"
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;