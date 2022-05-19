import React from 'react';
import { NavLink } from 'react-router-dom';

export default function AddButton() {
  return (
    
    <NavLink to="/recipe/add" exact>
      <button class="bg-orange-500 hover:bg-orange-700 text-white text-center py-2 px-4 rounded-full h-14 w-14 inline-flex items-center fixed bottom-10 right-12">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
      </button>
    </NavLink>
   
  )
}
