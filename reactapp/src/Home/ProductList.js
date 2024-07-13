import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Tooltip,
} from "@mui/material";
import {
  AddCircle,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import api from "../Api";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  const handleDelete = (id) => {
    api.delete(`/products/${id}`).then(() => {
      setProducts(products.filter((product) => product._id !== id));
    });
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: "auto",
        p: 3,
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Liste des produits
      </Typography>
      <List>
        {products.map((product) => (
          <React.Fragment key={product._id}>
            <ListItem
              sx={{
                backgroundColor: "white",
                borderRadius: 1,
                mb: 2,
                p: 2,
                boxShadow: 1,
                "&:hover": {
                  boxShadow: 3,
                  backgroundColor: "#f0f0f0",
                },
              }}
            >
              <ListItemText
                primary={product.name}
                secondary={`Type: ${product.type}, Price: ${product.price}, Rating: ${product.rating}, Warranty Years: ${product.warranty_years}, Available: ${product.available}`}
                primaryTypographyProps={{ fontWeight: "bold", color: "#333" }}
                secondaryTypographyProps={{ color: "#555" }}
              />
              <ListItemSecondaryAction>
                <Tooltip title="Edit Product">
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    component={Link}
                    to={`/edit-product/${product._id}`}
                    sx={{ color: "primary.main" }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Product">
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(product._id)}
                    sx={{ color: "error.main", ml: 2 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/create-product"
        size="large"
        endIcon={<AddCircle />}
        sx={{ mt: 3 }}
      >
        Ajouter Produit
      </Button>
    </Box>
  );
};

export default ProductList;
