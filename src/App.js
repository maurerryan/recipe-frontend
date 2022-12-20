import React, {useEffect, useState } from 'react';
import './App.css';
import RecipeCard from './components/RecipeCard';
import AddRecipe from './pages/AddRecipe';
import AddIngredients from './pages/AddIngredients';
import About from './pages/About';
import Contact from './pages/Contact';
import NoMatch from './pages/NoMatch';
import NavigationBar from './components/NavigationBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Modal from './modals/Modal';
import ViewRecipes from './pages/ViewRecipes';

function App() {

  //const recipes = [1, 2, 3, 4, 5, 6];

  return (

  <Router>
    <div>
    <NavigationBar />
      <Routes>
        <Route  exact path="/" element={<ViewRecipes />} />
        <Route  path="/recipe/:id" element={<RecipeCard />} />
        <Route  path="/recipe/add" element={<AddRecipe />} />
        <Route  path="/ingredients/add/:id" element={<AddIngredients />} />
        <Route  exact path="/about" element={<About />} />
        <Route  exact path="/contact" element={<Contact />} />
        <Route  exact path="/modal" component={<Modal />} />
        <Route  exact path="*" element={<NoMatch />} />
      </Routes>
    </div>
  </Router>

  );
}

export default App;
