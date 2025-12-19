import React from "react";
import { Grid } from "@mui/material";

const SingleProduct = ({product}) =>{
return(
<Grid item xs={3}>
    <h2>{product.name}</h2>
    <p>{product.price}</p>
   
</Grid>
)
}
export default SingleProduct;