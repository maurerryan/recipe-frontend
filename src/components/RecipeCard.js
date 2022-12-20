import React, {useEffect, useState } from 'react';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import plate from '../plate.jpg';
import IngredientList from './IngredientList';
import InstructionList from './InstructionList';


export default function RecipeCard() {



//const [id, setId] = useState(1);
const [recipe, setRecipe] = useState(null);
const params = useParams();

console.log(params.id);

useEffect(() => {
    
    fetch(`http://localhost/api/recipes/${params.id}`)
    .then(response => response.json())
    .then(results => {

        console.log(results);
        setRecipe(results);
    });
}, []);

return (
    <div className="content" class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5">

    {recipe && (
    
    <div class="rounded overflow-hidden shadow-lg">
    <img class="w-full" src={plate} alt="Plate" />
    <div class="px-6 py-4">
    <div class="flow-root">  
        <div class="font-bold text-xl mb-2 float-left text-orange-600">{recipe.name}</div>
        <div class="font-bold text-sm mb-2 float-right text-teal-500">{recipe.servings} Servings</div>
    </div>
        <p class="text-gray-700 text-base">{recipe.description}</p>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6 ml-2 mr-2">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        {/* <div class="font-semi-bold text-l mb-2 float-left text-gray-900 flex flex-col">PREP TIME {recipe.preptime}</div>
        <div class="font-bold text-l mb-2 float-left text-gray-900 flex flex-col">COOK TIME {recipe.cooktime}</div> */}
        <div>
            <div class="font-semi-bold inline">PREP TIME </div><div class="font-normal inline">{recipe.preptime}</div>
            </div>
            <div class="mb-6">
            <div class="font-semi-bold inline">COOK TIME </div><div class="font-normal inline">{recipe.cooktime}</div>
            </div>
            <IngredientList />
        </div>
        <div class="w-full md:w-1/2 px-3">
            <InstructionList />
        </div>
    </div>
    <div class="px-6 pt-1 pb-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#tuna</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#pasta</span>
    </div>
    </div>
   
    )}

    </div>
);
}