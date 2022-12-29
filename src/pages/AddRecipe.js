import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import plate from '../plate.jpg';
import { validateFields } from '../validation';

//import axiosConfig from 'axios';
import axiosConfig from '../helpers/axiosConfig';
import classNames from 'classnames';
import ReturnPreviousButton from '../components/ReturnPreviousButton';


  const AddRecipe = () => {

    const initialRecipeState = {
              name: {val: '', validateOnChange: false, error: ''},
              description: {val: '', validateOnChange: false, error: ''},
              servings: {val: '', validateOnChange: false, error: ''},
              preptime: {val: '', validateOnChange: false, error: ''},
              cooktime: {val: '', validateOnChange: false, error: ''},
              submitCalled: false,
              allFieldsValidated: false
    };
    
    const [recipe, setRecipe] = useState(initialRecipeState);
    const [recipe_id, setRecipeId] = useState(null);

    // change once login and sanctum are set up
    const [userId, setUserId] = useState(2);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [validationComplete, setValidationComplete] = useState(false);
    const [submitComplete, setSubmitComplete] = useState(false);

    


    
    const handleBlur = (validationFunc, e) => {
      
      const { name, value } = e.target;

      // console.log('test handleBlur');

      if(recipe[name].validateOnChange === false && recipe.submitCalled === false){
        setRecipe((prevState) => {
          const newState = {...prevState};

          newState[name].validateOnChange = true;
          newState[name].error = validationFunc(value, name);
          
          return newState
      
        });
      }

    };
    const handleInputChange = (validationFunc, e) => {

      const { name, value } = e.target;

      // console.log('test handleInputChange');

      setRecipe((prevState) => {
        const newState = {...prevState}
        newState[name].val = value;
        newState[name].error = newState[name]['validateOnChange'] ? validationFunc(value, name) : '';
        return newState
      });

    };
  
    const saveRecipe = () => {

      setValidationComplete(false);

      setIsLoading(true);

      setError(null);

      const nameError = validateFields.validateString(recipe.name.val, 'name');
      const descriptionError = validateFields.validateString(recipe.description.val, 'description');
      const servingsError = validateFields.validateString(recipe.servings.val, 'servings');
      const preptimeError = validateFields.validateString(recipe.preptime.val, 'prep time');
      const cooktimeError = validateFields.validateString(recipe.cooktime.val, 'cook time');

      if([nameError, descriptionError, servingsError, preptimeError, cooktimeError].every(e => e === false))
          {
          
          // console.log('test error check (no errors)');
      

          var data = {
            name: recipe.name.val,
            description: recipe.description.val,
            servings : recipe.servings.val,
            preptime: recipe.preptime.val,
            cooktime: recipe.cooktime.val,
            userId: userId
          };

          setValidationComplete(true);
          submitData(data);
          setIsLoading(true);

      }
      else
      {
        
        // console.log('test error check (errors)');

        setRecipe((prevState) => {
          const newState = {...prevState}

          recipe.name.error = nameError;
          recipe.name.validateOnChange = true;

          recipe.description.error = descriptionError;
          recipe.description.validateOnChange = true;

          recipe.servings.error = servingsError;
          recipe.servings.validateOnChange = true;

          recipe.preptime.error = preptimeError;
          recipe.preptime.validateOnChange = true;

          recipe.cooktime.error = cooktimeError;
          recipe.cooktime.validateOnChange = true;

          return newState
        
        });

        setIsLoading(false);

      }


    };

    function submitData(data)
    {


      setSubmitComplete(true);
      axiosConfig
      .post(`/recipes`, data)
        .then(response => {
          setRecipeId(response.data.recipe_id);
          setIsLoading(false);
      })
        .catch(error => {

          console.log(error.response);
          setError(error.message);

          Object.keys(error.response.data.errors).forEach(function(prop) {
              setRecipe((prevState) => {
              const newState = {...prevState}
              newState[prop].error = error.response.data.errors[prop];
              return newState
            });
          });

          setIsLoading(false);
      });
      
    }

    return (
      <div className="content" class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5">
      <div class="rounded overflow-hidden shadow-lg">
      <img class="w-full" src={plate} alt="Plate" />
      <div class="px-6 py-4">
                {validationComplete && submitComplete && !error && (
                    <p className="text-success text-center text-green-500 text-xs italic">
                      Success, All fields are validated
                    </p>
                )}
                {
                  error && (
                    <p className="text-success text-center text-red-500 text-xs italic">
                      { error.toString() }
                    </p>
                  )
                }
      <div class="flex flex-wrap -mx-3 mb-6 ml-1 mr-1">
      <div class="w-full md:w-3/4 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2" for="name">
          Recipe Name
        </label>
        <input
          className={classNames("appearance-none block w-full bg-gray-200 border rounded py-1 px-3 mb-1 leading-tight focus:outline-none focus:bg-white",
          { 'border-gray-200': recipe.name.error === false },
          { 'border-red-500': recipe.name.error },
          { 'border-green-400': recipe.allFieldsValidated }
          )}  
          type="text" 
          id="name"
          name="name"
          placeholder="Carne Asada" 
          value={recipe.name.val}
          onChange={e => handleInputChange(validateFields.validateString, e)}
          onBlur={e => handleBlur(validateFields.validateString, e)}
          required
        />
        <p className="text-red-500 text-xs italic">{recipe.name.error}</p>
      </div>
      <div class="w-full md:w-1/4 px-3">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2">
          Servings
        </label>
        <input 
          className={classNames("appearance-none block w-full bg-gray-200 border rounded py-1 px-3 mb-1 leading-tight focus:outline-none focus:bg-white",
          { 'border-gray-200': recipe.servings.error === false },
          { 'border-red-500': recipe.servings.error },
          { 'border-green-400': recipe.allFieldsValidated }
          )}  
          type="text" 
          id="servings" 
          name="servings" 
          placeholder="4" 
          value={recipe.servings.val}
          onChange={e => handleInputChange(validateFields.validateString, e)}
          onBlur={e => handleBlur(validateFields.validateString, e)}
          required
        />
        <p className="text-red-500 text-xs italic">{recipe.servings.error}</p>
      </div>
      <div class="w-full px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-4">
          Recipe Description
        </label>
        <textarea 
          className={classNames("appearance-none block w-full bg-gray-200 border rounded py-1 px-3 mb-1 leading-tight focus:outline-none focus:bg-white",
          { 'border-gray-200': recipe.description.error === false },
          { 'border-red-500': recipe.description.error },
          { 'border-green-400': recipe.allFieldsValidated }
          )}  
          id="description"
          name="description"
          placeholder="Tender carne asada that will go with any side" 
          value={recipe.description.val}
          onChange={e => handleInputChange(validateFields.validateString, e)}
          onBlur={e => handleBlur(validateFields.validateString, e)}
          required
        >
        </textarea>
        <p className="text-red-500 text-xs italic">{recipe.description.error}</p>
      </div>
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-4">
          Prep Time
        </label>
        <input 
          className={classNames("appearance-none block w-full bg-gray-200 border rounded py-1 px-3 mb-1 leading-tight focus:outline-none focus:bg-white",
          { 'border-gray-200': recipe.preptime.error === false },
          { 'border-red-500': recipe.preptime.error },
          { 'border-green-400': recipe.allFieldsValidated }
          )}  
          type="text" 
          id="preptime" 
          name="preptime" 
          placeholder="20" 
          value={recipe.preptime.val}
          onChange={e => handleInputChange(validateFields.validateString, e)}
          onBlur={e => handleBlur(validateFields.validateString, e)}
          required
        />
        <p className="text-red-500 text-xs italic">{recipe.preptime.error}</p>
        </div>
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-4">
          Cook Time
        </label>
        <input 
          className={classNames("appearance-none block w-full bg-gray-200 border rounded py-1 px-3 mb-1 leading-tight focus:outline-none focus:bg-white",
          { 'border-gray-200': recipe.cooktime.error === false },
          { 'border-red-500': recipe.cooktime.error },
          { 'border-green-400': recipe.allFieldsValidated }
          )}  
          type="text" 
          id="cooktime" 
          name="cooktime" 
          placeholder="30" 
          value={recipe.cooktime.val}
          onChange={e => handleInputChange(validateFields.validateString, e)}
          onBlur={e => handleBlur(validateFields.validateString, e)}
          required
        />
        <p className="text-red-500 text-xs italic">{recipe.cooktime.error}</p>
      </div>
      </div>

      {isLoading ? (
        <button class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full float-right inline-flex items-center mb-4 mr-4 mt-10 ..." disabled>
          Processing...
          {/* <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg> */}
        </button>
        ) : (
        <button class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full float-right inline-flex items-center mb-4 mr-4 mt-10" onClick={saveRecipe}>
          <span>Next</span> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="butt" stroke-linejoin="bevel"><path d="M9 18l6-6-6-6"/></svg>
        </button>
        ) 
      }

      {recipe_id && (<Navigate to={`/ingredients/add/${recipe_id}`} replace={true} />)}
      <ReturnPreviousButton link={'/'}/>
      </div>
      </div>
    </div>
  
    )
  };

export default AddRecipe;