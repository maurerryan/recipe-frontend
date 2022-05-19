import React, { useState } from 'react';
import plate from '../plate.jpg';

export default function AddRecipe() {

    const styles = {
      
        content: {
        //   height: '100%',
        //   width: '100%',
          //backgroundColor: 'rgba(0, 255, 0, 0.5)',
        }
      }

    const [recipe, setRecipe] = useState();


    function addRecipe() {
        setRecipe([...recipe, {
            name: 'test5',
        }])
    }

  return (
    // <div>
    // <h2>Add Recipe</h2>
    //     <form action="#" onSubmit={addRecipe}>
    //         <input type="text" className="recipe-input" placeholder="Recipe Name" />
    //     </form>
    // </div>
    // <div class="flex justify-center">
    <div className="content" class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5">
    
    <div class="rounded overflow-hidden shadow-lg">
    <img class="w-full" src={plate} alt="Plate" />
    <div class="px-6 py-4">
    <div class="flex flex-wrap -mx-3 mb-6 ml-1 mr-1">
    <div class="w-full md:w-3/4 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2" for="grid-first-name">
        Recipe Name
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-1 px-3 mb-1 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Carne Asada" />
      {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}

    </div>
    <div class="w-full md:w-1/4 px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2" for="grid-last-name">
        Servings
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="4" />
    </div>
    <div class="w-full px-3">
    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-4" for="grid-first-name">
        Recipe Description
      </label>
      <textarea class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
    </div>
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-4" for="grid-last-name">
        Prep Time
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="20" />
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2" for="grid-last-name">
        Cook Time
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="30" />
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-6" for="grid-last-name">
        Add Ingredient
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="1 Cup Diced Tomatoes" />
    
    </div>
    <div class="w-full md:w-1/2 px-3">
    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-4" for="grid-last-name">
        Add Instruction
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Dice 2 Small Tomatoes and add to bowl" />
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-4" for="grid-last-name">
        Add Tags
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="pasta" />
    
    </div>
    {/* <div class="w-full px-3">
    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-4" for="grid-first-name">
        Recipe Notes
      </label>
      <textarea class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
    </div> */}
  </div>
    <div class="px-6 pt-4 pb-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#tuna</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#pasta</span>
    </div>
    </div>
    </div>
    </div>
// </div>
 
  )
}