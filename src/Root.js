import React, { useContext, useState, useEffect } from 'react';
import './App.css';
import RecipeCard from './components/RecipeCard';
import AddRecipe from './screens/AddRecipe';
import AddIngredients from './screens/AddIngredients';
import About from './screens/About';
import Contact from './screens/Contact';
import NoMatch from './screens/NoMatch';
import NavigationBar from './components/NavigationBar';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Modal from './modals/Modal';
import ViewRecipes from './screens/ViewRecipes';
import { AuthContext } from './context/AuthProvider';
import Login from './screens/Auth/Login';
import Register from './screens/Auth/Register';
import { ClipLoader } from 'react-spinners';
import Protected from './components/Protected';

export default function App() {

    const [isLoading, setIsLoading] = useState(true);
    const { user, setUser } = useContext(AuthContext);
    const { logout } = useContext(AuthContext);

    useEffect(() => {
      // check if user is logged in or not.
      // Check SecureStore for the user object/token
  
      // SecureStore.getItemAsync('user')
      //   .then(userString => {
      //     if (userString) {
      //       setUser(JSON.parse(userString));
      //     }
      //     setIsLoading(false);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //     setIsLoading(false);
      //   });
      const userString = localStorage.getItem("user");
      if(userString)
      {
        setUser(JSON.parse(userString));
      }

      setIsLoading(false);
    }, []);

    if(isLoading){
      return (
        <div class="flex h-screen">
        {/* <div class="m-auto"> */}
        <ClipLoader color="rgba(249, 115, 22, 1)" />
        </div>
      )
    }

  return (
    <>
    <Router>
      <div>
      {/* <NavigationBar /> */}
      <nav>
        <ul>
          <li>
              <NavLink to="/home" activeClassName="active">
                  Home
              </NavLink>
          </li>  
          <li>
              <NavLink to="/about" activeClassName="active" exact>
                  About
              </NavLink>
          </li>  
          <li>
              <NavLink to="/contact" activeClassName="active" exact>
                  Contact
              </NavLink>
          </li>  
          <li>
            {user ? (
              <NavLink to="/login" activeClassName="active" onClick={logout} exact>
                Logout
              </NavLink>
              ) : (
              <NavLink to="/login" activeClassName="active" exact>
                Login
              </NavLink>
            )
            }
          </li>  
        </ul>
      </nav>
      <Routes>
        
          {/* <Route  exact path="/" element={<ViewRecipes />} />
          <Route  path="/recipe/:id" element={<RecipeCard />} />
          <Route  path="/recipe/add" element={<AddRecipe />} />
          <Route  path="/ingredients/add/:id" element={<AddIngredients />} />
        
          <Route  exact path="/about" element={<About />} />
          <Route  exact path="/contact" element={<Contact />} />
          <Route  exact path="/modal" component={<Modal />} />
          <Route  exact path="*" element={<NoMatch />} /> */}

          <Route  path="/home" 
              element={
                <Protected user={user}>
                  <ViewRecipes />
                </Protected>
              } />
          <Route  path="recipe/:id" 
              element={
                <Protected user={user}>
                  <RecipeCard />
                </Protected>
              } />
          <Route  path="recipe/add" 
              element={
                <Protected user={user}>
                  <AddRecipe />
                </Protected>
              } />
          <Route  path="ingredients/add/:id" 
              element={
                <Protected user={user}>
                  <AddIngredients />
                </Protected>
              } />
          
          <Route  path="login" element={<Login />} />
          <Route  path="register" element={<Register />} />
          <Route  path="about" element={<About />} />
          <Route  path="contact" element={<Contact />} />
          <Route  path="modal" component={<Modal />} />
          <Route  path="*" element={<NoMatch />} />
        
        </Routes>
      </div>
    </Router>
  </>
  );
}
