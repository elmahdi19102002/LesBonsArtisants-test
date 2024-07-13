import React from "react";
import { Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { logout } = useAuth();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        p: 2,
        bgcolor: "background.default",
      }}
    >
      <Box>
        <Link to="/">Acceuil</Link>
      </Box>
      <Button onClick={logout} variant="contained" color="secondary">
        Se déconnecter
      </Button>
    </Box>
  );
};

export default Header;
