import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  TextField,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  Container,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import api from "../Api";

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    type: "",
    price: "",
    rating: "",
    warranty_years: "",
    available: false,
  });

  const navigate = useNavigate();
  const { _id } = useParams();
  const { token } = useAuth();

  useEffect(() => {
    if (_id) {
      api.get(`/products/${_id}`).then((response) => {
        setProduct(response.data);
      });
    }
  }, [_id]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    if (_id) {
      api.put(`/products/${_id}`, product, config).then(() => {
        navigate("/");
      });
    } else {
      api.post("/products", product, config).then(() => {
        navigate("/");
      });
    }
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
        backgroundColor: "background.paper",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        {_id ? "Modifier" : "Créer"} Produit
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
        }}
      >
        <TextField
          label="Name"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
          fullWidth
          variant="outlined"
          size="small"
          sx={{ mb: 2 }}
        />
        <TextField
          label="Type"
          name="type"
          value={product.type}
          onChange={handleChange}
          required
          fullWidth
          variant="outlined"
          size="small"
          sx={{ mb: 2 }}
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          required
          fullWidth
          variant="outlined"
          size="small"
          sx={{ mb: 2 }}
        />
        <TextField
          label="Rating"
          name="rating"
          type="number"
          value={product.rating}
          onChange={handleChange}
          required
          fullWidth
          variant="outlined"
          size="small"
          sx={{ mb: 2 }}
        />
        <TextField
          label="Warranty Years"
          name="warranty_years"
          type="number"
          value={product.warranty_years}
          onChange={handleChange}
          required
          fullWidth
          variant="outlined"
          size="small"
          sx={{ mb: 2 }}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="available"
              checked={product.available}
              onChange={handleChange}
              color="primary"
            />
          }
          label="Available"
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          sx={{
            padding: 1.5,
            borderRadius: 2,
            fontWeight: "bold",
            boxShadow: 2,
            "&:hover": {
              boxShadow: 4,
            },
          }}
        >
          {_id ? "Modifier" : "Créer"} Produit
        </Button>
      </Box>
    </Container>
  );
};

export default ProductForm;
