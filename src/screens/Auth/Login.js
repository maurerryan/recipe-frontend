import { useContext, useState } from 'react';
import classNames from 'classnames';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ClipLoader } from 'react-spinners';
import plate from '../../plate.jpg';
import { AuthContext } from '../../context/AuthProvider';

export default function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [serverError, setServerError] = useState('');
    const { login, error, isLoading } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors }
      } = useForm();
  
  
      const onSubmit = (data) => {
        console.log(data);
        login(data.username, data.password);
        navigate('/home');
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
      {/* <div class="w-full md:w-3/4 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2" for="username">
          First Name
        </label>
        <input {...register("username", { 
            required: true
          })} 
          className={classNames("appearance-none block w-full bg-gray-200 border rounded py-1 px-3 mb-1 leading-tight focus:outline-none focus:bg-white",
            { 'border-gray-200': errors.username === false},
            { 'border-red-500': errors.username }
          )} 
          defaultValue=""  
          placeholder="Enter username"
        />
        {errors.username && errors.username.type === "required" && <p className="text-red-500 text-xs italic">This is required</p>}
        {errors.username && errors.username.type === "server" && <p className="text-red-500 text-xs italic">{errors.username.message}</p>}
      </div> */}

      <div class="w-full md:w-3/4 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2" for="username">
          Username
        </label>
        <input {...register("username", { 
            required: true
          })} 
          className={classNames("appearance-none block w-full bg-gray-200 border rounded py-1 px-3 mb-1 leading-tight focus:outline-none focus:bg-white",
            { 'border-gray-200': errors.username === false},
            { 'border-red-500': errors.username }
          )} 
          defaultValue=""  
          placeholder="Enter username"
        />
        {errors.username && errors.username.type === "required" && <p className="text-red-500 text-xs italic">This is required</p>}
        {errors.username && errors.username.type === "server" && <p className="text-red-500 text-xs italic">{errors.username.message}</p>}
      </div>

      <div class="w-full md:w-3/4 px-3 mt-4 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="password">
          Password
        </label>
        <input {...register("password", { 
            required: true
          })} 
          className={classNames("appearance-none block w-full bg-gray-200 border rounded py-1 px-3 mb-1 leading-tight focus:outline-none focus:bg-white",
            { 'border-gray-200': errors.password === false},
            { 'border-red-500': errors.password }
          )} 
          type="password"
          defaultValue=""  
          placeholder="Enter password"
        />
        {errors.password && errors.password.type === "required" && <p className="text-red-500 text-xs italic">This is required</p>}
        {errors.password && errors.password.type === "server" && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}

        <button class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full inline-flex items-left mt-4" type="submit" disabled={isLoading}>
            Login
        </button>
      </div>
    </div>
    
    </form>
    <button onClick={() => navigate('/register')}>Register</button>
    </div>
    </div>
  )
}