import React, { useState, useCallback } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import plate from '../plate.jpg';
import { validateFields } from '../validation';

// import axiosConfig from 'axios';
import axiosConfig from '../helpers/axiosConfig';
import classNames from 'classnames';
import ReturnPreviousButton from '../components/ReturnPreviousButton';



  const AddIngredients = () => {

    const params = useParams();

    let initialIngredientState = {order: {val: '', validateOnChange: false, error: ''}, 
                denomination: {val: '', validateOnChange: false, error: ''}, 
                measurement: {val: '', validateOnChange: false, error: ''}, 
                ingredient: {val: '', validateOnChange: false, error: ''}, 
                id: {val: params.id, validateOnChange: false, error: ''},
                submitCalled: false,
                allFieldsValidated: false
              };

    let objs = [initialIngredientState];

    const [ingredients, setIngredients] = useState(objs);
    const [isLoading, setIsLoading] = useState(false);
    const [validationComplete, setValidationComplete] = useState(false);
    const [submitComplete, setSubmitComplete] = useState(false);


    const handleBlur = (validationFunc, e, index) => {
      const { name, value } = e.target;
      // validate onBlur only when validateOnChange for that field is false
      // because if validateOnChange is already true there is no need to validate onBlur

      const list = [...ingredients];
      
      if (list[index][name]['validateOnChange'] === false && 
          list[index]['submitCalled'] === false) {

          list[index][name]['validateOnChange'] = true;
          list[index][name]['error'] = validationFunc(value, name);
    
          setIngredients(list);
      }
      return;
    };


    // handle input change
    const handleInputChange = (validationFunc, e, index) => {
      const { name, value } = e.target;

      const list = [...ingredients];

      list[index]['order']['val'] = index+1;
      list[index][name]['val'] = value;
      list[index][name]['error'] = list[index][name]['validateOnChange'] ? validationFunc(value, name) : '';

      setIngredients(list);
    
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
      const list = [...ingredients];
      list.splice(index, 1);
      setIngredients(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
      setIngredients([...ingredients, initialIngredientState]);
    };
  
    const handleSubmit = (evt) => {

     //handleSubmit(evt){

      setValidationComplete(false);
    
      // evt.preventDefault();

      setIsLoading(true);

      let requests = [];

      let validRecords = [];

      ingredients.map((value, index) => {

        const orderError = validateFields.validateString(String(value.order.val, 'order'));
        const denominationError = validateFields.validateString(value.denomination.val, 'denomination');
        const measurementError = validateFields.validateString(value.measurement.val, 'measurement');
        const ingredientError = validateFields.validateString(value.ingredient.val, 'ingredient');
        const idError = validateFields.validateString(value.id.val, 'id');
        
          if([orderError, denominationError, measurementError, ingredientError, idError].every(e => e === false))
          {

            const list = [...ingredients];

            list[index]['allFieldsValidated'] = true;
            setIngredients(list);

            let recordData = {
                                order: value.order.val, 
                                denomination: value.denomination.val, 
                                measurement: value.measurement.val, 
                                ingredient: value.ingredient.val, 
                                id: value.id.val
                            };

            let options = {
                              baseURL: '/ingredients',
                              url: '',
                              method: 'post',
                              data: recordData
                          };

            requests.push(axiosConfig.request(options));

            setIngredients({ ...ingredients[index], allFieldsValidated: true });
            validRecords.push(true);

          }
          else
          {
            setIsLoading(false);

            const list = [...ingredients];

            list[index]['denomination']['error'] = denominationError;
            list[index]['denomination']['validateOnChange'] = true;

            list[index]['measurement']['error'] = measurementError;
            list[index]['measurement']['validateOnChange'] = true;

            list[index]['ingredient']['error'] = ingredientError;
            list[index]['ingredient']['validateOnChange'] = true;

            setIngredients(list);
            validRecords.push(false);

          }
                                      
        });
        
        if(validRecords.every(e => e === true))
        {
          setValidationComplete(true);
          setTimeout(() => {
            submitData(requests);
          }, 1500);

          const newRecord = [...ingredients];
          setIngredients(newRecord);
        
        }

    };

    function submitData(requests)
    {
      // axiosConfig.all(requests)
      // .then(axiosConfig.spread(function(){
      //   console.log('requests successful');
      //   console.log(ingredients);
        setSubmitComplete(true);
      // })
      // ).catch(error => {
      //   console.log(error);
        setIsLoading(false);
      // });
    }


    return (
      <div className="content p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5">
      <div className="rounded overflow-hidden shadow-lg">
      <img className="w-full" src={plate} alt="Plate" />
      <div className="px-6 py-4">
                {validationComplete && submitComplete && (
                    <p className="text-success text-center text-green-500 text-xs italic">
                      Success, All fields are validated
                    </p>
                )}
        {
          ingredients.map((x, i) => 
          
            
            <div className="flex flex-wrap -mx-3 ml-1 mr-1">
              <div class="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                  
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2">
                    Order
                  </label>
                  <input 
                    className={classNames("appearance-none block w-full bg-gray-200 border rounded py-1 px-3 mb-1 leading-tight focus:outline-none focus:bg-white",
                    { 'border-gray-200': x.order.error === false },
                    { 'border-red-500': x.order.error },
                    { 'border-green-400': x.allFieldsValidated }
                    )} 
                    type="number" 
                    id="order"
                    name="order"
                    placeholder="1" 
                    value={i+1}
                    onChange={e => handleInputChange(validateFields.validateString, e, i)}
                    onBlur={e => handleBlur(validateFields.validateString, e, i)}
                    disabled
                  />
                  <p className="text-red-500 text-xs italic">{x.order.error}</p>
                </div>
                <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2">
                    Denomination
                  </label>
                  <input 
                    className={classNames("appearance-none block w-full bg-gray-200 border rounded py-1 px-3 mb-1 leading-tight focus:outline-none focus:bg-white",
                    { 'border-gray-200': x.denomination.error === false },
                    { 'border-red-500': x.denomination.error },
                    { 'border-green-400': x.allFieldsValidated }
                    )} 
                    type="text" 
                    id="denomination"
                    name="denomination"
                    placeholder="2" 
                    value={x.denomination.val}
                    onChange={e => handleInputChange(validateFields.validateString, e, i)}
                    onBlur={e => handleBlur(validateFields.validateString, e, i)}
                  />
                  <p className="text-red-500 text-xs italic">{x.denomination.error}</p>
                  </div>
                  <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2">
                    Measurement
                  </label>
                  <input 
                    className={classNames("appearance-none block w-full bg-gray-200 border rounded py-1 px-3 mb-1 leading-tight focus:outline-none focus:bg-white",
                    { 'border-gray-200': x.measurement.error === false },
                    { 'border-red-500': x.measurement.error },
                    { 'border-green-400': x.allFieldsValidated }
                    )} 
                    type="text" 
                    id="measurement"
                    name="measurement"
                    placeholder="Cups" 
                    value={x.measurement.val}
                    onChange={e => handleInputChange(validateFields.validateString, e, i)}
                    onBlur={e => handleBlur(validateFields.validateString, e, i)}
                  />
                  <p className="text-red-500 text-xs italic">{x.measurement.error}</p>
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2">
                    Ingredient
                  </label>
                  <div className="flex justify-between">
                  <input 
                    className={classNames("appearance-none block w-full bg-gray-200 border rounded py-1 px-3 mb-1 leading-tight focus:outline-none focus:bg-white",
                    { 'border-gray-200': x.ingredient.error === false },
                    { 'border-red-500': x.ingredient.error },
                    { 'border-green-400': x.allFieldsValidated }
                    )}  
                    type="text" 
                    id="ingredient" 
                    name="ingredient" 
                    placeholder="Milk" 
                    value={x.ingredient.val}
                    onChange={e => handleInputChange(validateFields.validateString, e, i)}
                    onBlur={e => handleBlur(validateFields.validateString, e, i)}
                  />
                  
                  {ingredients.length !== 1 && 
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded-full float-right inline-flex items-center ml-2" 
                    onClick={() => handleRemoveClick(i)}>
                    Remove</button>}
                    {ingredients.length - 1 === i && 
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded-full float-right inline-flex items-center ml-2 " 
                    onClick={handleAddClick}>
                    Add
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>*/}
                  </button> 
                  }
                  </div>
                  <p className="text-red-500 text-xs italic">{x.ingredient.error}</p>
                </div>
                
                </div>
                
        )}

        <ReturnPreviousButton link={`/recipe/add/${params.id}`}/>

        <button class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full float-right inline-flex items-center mb-4 mr-4 mt-10" onClick={handleSubmit} disabled={isLoading}>
          <span>Next</span> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="butt" stroke-linejoin="bevel"><path d="M9 18l6-6-6-6"/></svg>
        </button>

        {submitComplete && (<Navigate to={`/recipe/add`} replace={true} />)}

      </div>
      </div>
    </div>
   
    )
  };

export default AddIngredients;