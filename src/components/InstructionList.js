import React from 'react';

const instructions = [{id:1, item:"Mix together the olive oil, lemon juice, lemon zest, garlic powder, paprika, salt, oregano, black pepper, and brown sugar in a small bowl"}, 
                         {id:2, item:"Cover the chicken legs in the marinade and let sit for 30 minutes"}, 
                         {id:3, item:"Select preheat on air fryer, adjust to 380°F, and press Start/Pause"},
                         {id:4, item:"Place the chicken thighs in the preheated air fryer"},
                         {id:5, item:"Chicken, adjust time to 20 minutes, and press Start/Pause"}
                        ];

export default function InstructionList() {
  return (
    <div class="text-sm ml-6 mb-2 mt-2 text-gray-800">
        <ol class="class-outside list-decimal">
        {instructions.map(instruction => (
            // <h6 class="ml-6 mb-1">{ingredient.item}</h6>

                <li key={instruction.id} >{instruction.item}</li>
        ))}
        </ol>
    </div>
  )
}
