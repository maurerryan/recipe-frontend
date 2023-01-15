import React, { useContext, useState } from 'react';
import './App.css';
import RecipeCard from './components/RecipeCard';
import AddRecipe from './screens/AddRecipe';
import AddIngredients from './screens/AddIngredients';
import About from './screens/About';
import Contact from './screens/Contact';
import NoMatch from './screens/NoMatch';
import NavigationBar from './components/NavigationBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Modal from './modals/Modal';
import ViewRecipes from './screens/ViewRecipes';
import { AuthContext } from './context/AuthProvider';
import Login from './screens/Auth/Login';
import Register from './screens/Auth/Register';

export default function App() {

    const [isLoading, setIsLoading] = useState(true);
    const { user, setUser } = useContext(AuthContext);

        

  return (

    <Router>
      <div>
      <NavigationBar />
        <Routes>
        
          {/* <Route  exact path="/" element={<ViewRecipes />} />
          <Route  path="/recipe/:id" element={<RecipeCard />} />
          <Route  path="/recipe/add" element={<AddRecipe />} />
          <Route  path="/ingredients/add/:id" element={<AddIngredients />} />
        
          <Route  exact path="/about" element={<About />} />
          <Route  exact path="/contact" element={<Contact />} />
          <Route  exact path="/modal" component={<Modal />} />
          <Route  exact path="*" element={<NoMatch />} /> */}

          <Route  path="/" element={<ViewRecipes />} />
          <Route  path="recipe/:id" element={<RecipeCard />} />
          <Route  path="recipe/add" element={<AddRecipe />} />
          (user ? {
            <Route  path="ingredients/add/:id" element={<AddIngredients />} />
          });
          <Route  path="login" element={<Login />} />
          <Route  path="register" element={<Register />} />
          <Route  path="about" element={<About />} />
          <Route  path="contact" element={<Contact />} />
          <Route  path="modal" component={<Modal />} />
          <Route  path="*" element={<NoMatch />} />
        
        </Routes>
      </div>
    </Router>

  );
}
