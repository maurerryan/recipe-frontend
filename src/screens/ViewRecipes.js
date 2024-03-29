import React from 'react';
import AddButton from '../components/AddButton';
import RecipeCardList from '../components/RecipeCardList';

export default function ViewRecipes() {


  return (
    <div className="content" class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        <RecipeCardList />
    <>
        <AddButton />
    </>
    </div>
  )
}
