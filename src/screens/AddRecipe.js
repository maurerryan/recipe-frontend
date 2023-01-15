import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import plate from '../plate.jpg';
import { useForm } from "react-hook-form";
import axiosConfig from '../helpers/axiosConfig';
import classNames from 'classnames';
import { ClipLoader } from 'react-spinners';
import ReturnPreviousButton from '../components/ReturnPreviousButton';

export default function AddRecipe() {

  const [isLoading, setIsLoading] = useState(false);
  const [recipe_id, setRecipeId] = useState(null);
  const [serverError, setServerError] = useState('');

  const userId = 1;

    const {
      register,
      handleSubmit,
      watch,
      setError,
      formState: { errors }
    } = useForm();


    const onSubmit = (data) => {

      setIsLoading(true);

      console.log('submitted');
      
      axiosConfig
      .post(`/recipes`, data)
        .then(response => {
          setRecipeId(response.data.recipe_id);
          setIsLoading(false);
        })
        .catch((e) => {
          setIsLoading(false);
          const err = e.response.data;
          console.log(err);
          if(err.errors)
          {
            Object.keys(err.errors).forEach(function(prop) {
                setError(prop, {
                  type: "server",
                  message: err.errors[prop],
                });
            });
          }
          setServerError(e.response.statusText);
          
        });

    }; 

    return (
      <div className="content" class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5">
      <div class="rounded overflow-hidden shadow-lg">
      <img class="w-full" src={plate} alt="Plate" />
      <div class="px-6 py-4">

                {isLoading && (
                    <ClipLoader color="rgba(249, 115, 22, 1)" />
                )}
                {serverError && (
                    <p className="text-error text-center text-red-500 text-xs italic">
                      { serverError.toString() }
                    </p>
                )}
                {errors.userId && errors.userId.type === "server" && 
                    <p className="text-center text-red-500 text-xs italic">
                      {errors.userId.message}
                    </p>
                }

      <form onSubmit={handleSubmit(onSubmit)}>
      <div class="flex flex-wrap -mx-3 mb-6 ml-1 mr-1">
      <div class="w-full md:w-3/4 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2" for="name">
          Recipe Name
        </label>
        <input {...register("name", { required: true, maxLength: 45 })} 
          className={classNames("appearance-none block w-full bg-gray-200 border rounded py-1 px-3 mb-1 leading-tight focus:outline-none focus:bg-white",
            { 'border-gray-200': errors.name === false},
            { 'border-red-500': errors.name }
          )} 
          defaultValue=""  
          placeholder="Give recipe a name"
        />
        {errors.name && errors.name.type === "required" && <p className="text-red-500 text-xs italic">This is required</p>}
        {errors.name && errors.name.type === "maxLength" && <p className="text-red-500 text-xs italic">Max length exceeded</p>}
        {errors.name && errors.name.type === "server" && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
      </div>

      <div class="w-full md:w-1/4 px-3">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2">
          Servings
        </label>
        <input {...register("servings", { required: true, maxLength: 20 })} 
          className={classNames("appearance-none block w-full bg-gray-200 border rounded py-1 px-3 mb-1 leading-tight focus:outline-none focus:bg-white",
            { 'border-gray-200': errors.servings === false},
            { 'border-red-500': errors.servings }
          )} 
          defaultValue=""  
          placeholder="Number of servings"
        />
        {errors.servings && errors.servings.type === "required" && <p className="text-red-500 text-xs italic">This is required</p>}
        {errors.servings && errors.servings.type === "maxLength" && <p className="text-red-500 text-xs italic">Max length exceeded</p>}
        {errors.servings && errors.servings.type === "server" && <p className="text-red-500 text-xs italic">{errors.servings.message}</p>}
      </div>
      <div class="w-full px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-4">
          Recipe Description
        </label>
        <textarea {...register("description", { required: true})} 
          className={classNames("appearance-none block w-full bg-gray-200 border rounded py-1 px-3 mb-1 leading-tight focus:outline-none focus:bg-white",
          { 'border-gray-200': errors.description === false },
          { 'border-red-500': errors.description }
          )}  
          defaultValue="" 
          placeholder="Describe recipe"
        >
        </textarea>
        {errors.description && errors.description.type === "required" && <p className="text-red-500 text-xs italic">This is required</p>}
        {errors.description && errors.description.type === "server" && <p className="text-red-500 text-xs italic">{errors.description.message}</p>}
      </div>

      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2">
          Prep Time
        </label>
        <input {...register("preptime", { required: true, maxLength: 20 })} 
          className={classNames("appearance-none block w-full bg-gray-200 border rounded py-1 px-3 mb-1 leading-tight focus:outline-none focus:bg-white",
            { 'border-gray-200': errors.preptime === false},
            { 'border-red-500': errors.preptime }
          )} 
          defaultValue=""  
          placeholder="Prep time minutes"
        />
        {errors.preptime && errors.preptime.type === "required" && <p className="text-red-500 text-xs italic">This is required</p>}
        {errors.preptime && errors.preptime.type === "maxLength" && <p className="text-red-500 text-xs italic">Max length exceeded</p>}
        {errors.preptime && errors.preptime.type === "server" && <p className="text-red-500 text-xs italic">{errors.preptime.message}</p>}

      </div>
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2">
          Cook Time
        </label>
        <input {...register("cooktime", { required: true, maxLength: 20 })} 
          className={classNames("appearance-none block w-full bg-gray-200 border rounded py-1 px-3 mb-1 leading-tight focus:outline-none focus:bg-white",
            { 'border-gray-200': errors.cooktime === false},
            { 'border-red-500': errors.cooktime }
          )} 
          defaultValue="" 
          placeholder="Cook time minutes" 
        />
        {errors.cooktime && errors.cooktime.type === "required" && <p className="text-red-500 text-xs italic">This is required</p>}
        {errors.cooktime && errors.cooktime.type === "maxLength" && <p className="text-red-500 text-xs italic">Max length exceeded</p>}
        {errors.cooktime && errors.cooktime.type === "server" && <p className="text-red-500 text-xs italic">{errors.cooktime.message}</p>}
      </div>
      </div>

      <input type="hidden" {...register("userId")} defaultValue={userId} />


     <button class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full float-right inline-flex items-center mb-4 mr-4 mt-10" type="submit" disabled={isLoading}>
        <span>Next</span> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="butt" stroke-linejoin="bevel"><path d="M9 18l6-6-6-6"/></svg>
      </button>
      </form>

      {recipe_id && (<Navigate to={`/ingredients/add/${recipe_id}`} replace={true} />)}
      <ReturnPreviousButton link={'/'}/>
      </div>
      </div>
    </div>
    )
  };