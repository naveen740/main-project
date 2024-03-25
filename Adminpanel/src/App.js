import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Content from './components/Content';
import Header from './components/Header';
import Slider from './components/Slider';
import Dashboard from './components/Dashboard';
import Product from "./components/Product";
import Category from "./components/Category";
import Logout from "./components/Logout";
import AddProductForm from "./components/AddProductForm";
import './App.css';
import ProductDetail from "./components/ProductDetail";
import Login from "./components/Login";
import Registration from "./components/Registration";
import AddCategoryForm from "./components/AddCategoryForm";

function App() {
  const [isSlideVisible, setIsSlideVisible] = useState(true);
  const [showForm, setShowForm] = useState(false); // State to manage form visibility
  const [showForm2, setShowForm2] = useState(false); // State to manage form visibility
  const location = useLocation();

  const toggleSlideVisibility = () => {
    setIsSlideVisible(!isSlideVisible);
  };

  const handleRegister = () => {
    // Logic for handling registration
    console.log('Registration completed!');
  };

  // Function to toggle form visibility
  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };
  const handleCloseForm = () => {
    setShowForm(false);
  };
  // Function to toggle form visibility
  const toggleFormVisibility2 = () => {
    setShowForm2(!showForm2);
  };
  const handleCloseForm2 = () => {
    setShowForm2(false);
  };

  // Function to check if the current route is the login or registration page
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className={`App ${isSlideVisible ? 'with-slider' : 'without-slider'}`}>
      {!isAuthPage && <Header toggleSlideVisibility={toggleSlideVisibility}/>}
      {!isAuthPage && isSlideVisible && <Slider />}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product" element={<Product onAddButtonClick={toggleFormVisibility} />} /> {/* Pass toggleFormVisibility function */}
        <Route path="/category" element={<Category onAddButtonClick={toggleFormVisibility2} />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/products/:productId" element={<ProductDetail />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Registration onRegister={handleRegister}/>}/>
      </Routes>
      {!isAuthPage && showForm && <AddProductForm closeForm={handleCloseForm} />}
      {!isAuthPage && showForm2 && <AddCategoryForm closeForm={handleCloseForm2} />}
      {!isAuthPage && <Content />}
      {/* Render AddProductForm based on showForm state */}
    </div>
  );
}

export default App;
