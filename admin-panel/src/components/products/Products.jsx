import React, { useEffect, useState } from "react";
import SingleProduct from "./SingleProduct";
import axios from "axios";
import { Fab, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getData = () => {
    axios
      .get("http://localhost:4000/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{ position: "relative", padding: "24px" }}>
      <Link
        to="/admin/products/add"
        style={{ textDecoration: "none", color: "white", marginBottom: "16px" }}
      >
        <Fab
          color="primary"
          aria-label="add"
          style={{ position: "absolute", bottom: 20, right: 20 }}
        >
          <AddIcon />
        </Fab>
        Add New Product
      </Link>

      <h1>Products</h1>

      {products.length === 0 ? (
        <p>There are no products</p>
      ) : (
        <Grid container spacing={3}>
          {products.map((product, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <SingleProduct product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Products;
