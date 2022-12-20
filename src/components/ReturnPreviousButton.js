import React, {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';

export default function ReturnPreviousButton(props) 
{
    const link = props.link;

    const navigate = useNavigate();
    const handleOnClick = useCallback(() => navigate(link, {replace: true}), [navigate]);

    return (
        <button class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full float-left inline-flex items-center mb-4 mr-4 mr-4 mt-10" onClick={handleOnClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="butt" stroke-linejoin="bevel"><path d="M15 18l-6-6 6-6"/></svg>  <span>Prev</span>
        </button>
    );

}