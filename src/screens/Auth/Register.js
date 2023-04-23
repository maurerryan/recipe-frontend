import { useContext, useState } from 'react';
import classNames from 'classnames';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { ClipLoader } from 'react-spinners';
import plate from '../../plate.jpg';
import { AuthContext } from '../../context/AuthProvider';

export default function Register() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState('');
    // const { login } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors }
      } = useForm();
  
  
      const onSubmit = (data) => {

        console.log(data);

      };

  return (
    
    <div className="container shadow-lg">
    <div class="px-6 py-4">

    {/* {isLoading && (
        <ClipLoader color="rgba(249, 115, 22, 1)" />
    )}
    {serverError && (
        <p className="text-error text-center text-red-500 text-xs italic">
        { serverError.toString() }
        </p>
    )}
    */}

<form onSubmit={handleSubmit(onSubmit)}>
<div class="flex flex-wrap -mx-3 mb-6 ml-2 mr-2">
    <div class="w-full md:w-3/4 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2" for="username">
        Username
        </label>
        <input {...register("username", { 
            required: true,
            minLength: 3, 
            maxLength: 20
        })} 
        className={classNames("appearance-none block w-full bg-gray-200 border rounded py-1 px-3 mb-1 leading-tight focus:outline-none focus:bg-white",
            { 'border-gray-200': errors.username === false},
            { 'border-red-500': errors.username }
        )} 
        defaultValue=""  
        placeholder="Choose a username"
        />
        {errors.username && errors.username.type === "required" && <p className="text-red-500 text-xs italic">This is required</p>}
        {errors.username && errors.username.type === "minLength" && <p className="text-red-500 text-xs italic">Min length error</p>}
        {errors.username && errors.username.type === "maxLength" && <p className="text-red-500 text-xs italic">Max length exceeded</p>}
        {errors.username && errors.username.type === "server" && <p className="text-red-500 text-xs italic">{errors.username.message}</p>}
    </div>

    <div class="w-full md:w-3/4 px-3 mt-4 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="password">
        Password
        </label>
        <input {...register("password", { 
            required: true, 
            minLength: 6,
            maxLength: 20 
        })} 
        className={classNames("appearance-none block w-full bg-gray-200 border rounded py-1 px-3 mb-1 leading-tight focus:outline-none focus:bg-white",
            { 'border-gray-200': errors.password === false},
            { 'border-red-500': errors.password }
        )} 
        type="password"
        defaultValue=""  
        placeholder="Choose a password"
        />
        {errors.password && errors.password.type === "required" && <p className="text-red-500 text-xs italic">This is required</p>}
        {errors.password && errors.password.type === "minLength" && <p className="text-red-500 text-xs italic">Min length error</p>}
        {errors.password && errors.password.type === "maxLength" && <p className="text-red-500 text-xs italic">Max length exceeded</p>}
        {errors.password && errors.password.type === "server" && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
    </div>

    <div class="w-full md:w-3/4 px-3 mt-4 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="password">
        Confirm Password
        </label>
        <input {...register("password2", { 
            required: true, 
            minLength: 6,
            maxLength: 20 
        })} 
        className={classNames("appearance-none block w-full bg-gray-200 border rounded py-1 px-3 mb-1 leading-tight focus:outline-none focus:bg-white",
            { 'border-gray-200': errors.password === false},
            { 'border-red-500': errors.password }
        )} 
        type="password"
        defaultValue=""  
        placeholder="Confirm password"
        />
        {errors.password2 && errors.password2.type === "required" && <p className="text-red-500 text-xs italic">This is required</p>}
        {errors.password2 && errors.password2.type === "minLength" && <p className="text-red-500 text-xs italic">Min length error</p>}
        {errors.password2 && errors.password2.type === "maxLength" && <p className="text-red-500 text-xs italic">Max length exceeded</p>}
        {errors.password2 && errors.password2.type === "server" && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}

    <button class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full inline-flex items-left mt-4" type="submit" disabled={isLoading}>
        Register
    </button>
    </div>


</div>
</form>
<button onClick={() => navigate('/login')}>Login</button>
</div>
</div>




  )
}
