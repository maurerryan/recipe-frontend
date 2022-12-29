import React, {useEffect, useState } from 'react';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import plate from '../plate.jpg';


export default function RecipeCardPreview(props) {

//const [id, setId] = useState(1);
const [recipe, setRecipe] = useState(null);
const params = useParams();

const recipe_id = props.id;

//console.log(params.id);

useEffect(() => {
    //fetch(`http://localhost/api/recipes/${params.id}`)
    fetch(`http://localhost/api/recipes/${recipe_id}`)
    .then(response => response.json())
    .then(results => {

        console.log(results);
        setRecipe(results);
    });
}, []);

return (
    // <div className="content" class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
    <>
    {recipe && (
    
    <div class="rounded overflow-hidden shadow-lg">
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
    </div>
   
    )}
    </>
    // </div>
);
}