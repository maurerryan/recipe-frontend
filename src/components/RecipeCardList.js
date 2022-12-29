import React, {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeCardPreview from './RecipeCardPreview';
import axiosConfig from '../helpers/axiosConfig';
import { ClipLoader } from 'react-spinners';

export default function RecipeCardList() {

const [recipes, setRecipes] = useState([]);
const [isLoading, setIsLoading] = useState(true);


useEffect(() => {
    getRecipes();
}, []);


function getRecipes() {
    axiosConfig
    .get('/recipes')
    .then(response => {
        setRecipes(response.data);
        setIsLoading(false);
    })
    .catch(error => {
        console.log(error);
        setIsLoading(false);
    });
}

return (
    <>
    {isLoading && (
        <div class="flex h-screen">
        {/* <div class="m-auto"> */}
        <ClipLoader color="rgba(249, 115, 22, 1)" />
        </div>
        
    )}
    {recipes && (
        <>
            {recipes.map(recipe => (
                <Link to={`recipe/${recipe.recipe_id}`} >
                    <RecipeCardPreview id={recipe.recipe_id} />
                </Link>
            ))}
        </>
    )}
</>
);

}