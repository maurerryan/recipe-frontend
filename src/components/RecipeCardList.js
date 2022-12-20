import React, {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeCardPreview from './RecipeCardPreview';


export default function RecipeCardList() {

const [recipes, setRecipes] = useState([]);

useEffect(() => {
    fetch('http://localhost/api/recipes')
    .then(response => response.json())
    .then(results => {

        setRecipes(results);
    });
}, []);

return (
    <>
    {recipes && (
    <>
    {recipes.map(recipe => (
    <Link to={`recipe/${recipe.recipe_id}`} >
        {/* <div class="rounded overflow-hidden shadow-lg">
        <img class="w-full" src={plate} alt="Plate" />
        <div class="px-6 py-4">
        <div class="flow-root">  
            <div class="font-bold text-xl mb-2 float-left text-orange-600">{recipe.name}</div><div class="font-bold text-sm mb-2 float-right text-teal-500">{recipe.servings} Servings</div></div>
            <p class="text-gray-700 text-base">
            {recipe.description}
            </p>
        </div>
        <div class="px-6 pt-4 pb-2">
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#tuna</span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#pasta</span>
        </div>
        </div> */}
        <RecipeCardPreview id={recipe.recipe_id} />
    </Link>
    ))}
    </>
    )}
</>
);

}