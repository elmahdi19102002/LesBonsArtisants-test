import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Container } from "@mui/material";
import ProductList from "./Home/ProductList";
import ProductForm from "./Home/ProductForm";
import LoginForm from "./Auth/LoginForm";
import RegisterForm from "./Auth/RegisterForm";
import { AuthProvider, useAuth } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Header />}
      <Container>
        <Routes>
          <Route
            path="/"
            element={<PrivateRoute element={<ProductList />} />}
          />
          <Route
            path="/create-product"
            element={<PrivateRoute element={<ProductForm />} />}
          />
          <Route
            path="/edit-product/:_id"
            element={<PrivateRoute element={<ProductForm />} />}
          />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <LoginForm />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/" /> : <RegisterForm />}
          />
        </Routes>
      </Container>
    </>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <AppContent />
    </Router>
  </AuthProvider>
);

export default App;
