import React from 'react';

export default function IngredientList() {

    const ingredients = [{id:1, item:"2 liters of water"}, 
                         {id:2, item:"1 tablespoon of salt"}, 
                         {id:3, item:"2 large russet potatoes, thinly sliced"},
                         {id:4, item:"1 tablespoon olive oil"},
                         {id:5, item:"Salt & pepper to taste"}
                        ];

  return (
    <div class="text-sm ml-6 mb-2 mt-2 text-gray-800">
      <ul class="class-outside list-disc">
        {ingredients.map(ingredient => (
            // <h6 class="ml-6 mb-1">{ingredient.item}</h6>

                <li>{ingredient.item}</li>
        ))}
        </ul>
    </div>
    
  )
}
