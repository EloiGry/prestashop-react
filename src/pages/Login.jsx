import bcrypt from 'bcryptjs';
import React from 'react';
import axios from 'axios';
import { useRef } from 'react'

const apiKey = '3I6XUGSZG1Z7TYM9XV2MJNX8936HNQN7'
const dataType = 'output_format=JSON'

const Login = () => {
    const emailInputRef = useRef()
    const passwordInputRef = useRef()

    const handleLoginForm = () => {
        const email = emailInputRef.current.value
        const password = passwordInputRef.current.value

            axios.get(`http://localhost/shop/api/customers&display=full&filter[email]=${email}&ws_key=${apiKey}?${dataType}`)
            .then(function (response) {
                const compare = bcrypt.compare(password, response.data.customers[0].passwd.replace('$2y$', '$2a$'))
                compare.then(function (log) {
                    if(log) {
                        // set('user_session', response.data.customers[0].secure_key)
                        return response
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
            })

            .catch(function (error) {
                console.log(error);
            })

        
    
        console.log(email, password);

    }

    return (
        <form className='flex flex-col items-center'>
            <input type='email' ref={emailInputRef} placeholder='Mail' className='border-solid border-2 m-5 p-2' />
            <input type='password' ref={passwordInputRef} placeholder='Password' className='border-solid border-2 m-5 p-2'/>
            <button type='submit' onClick={e => {e.preventDefault(); handleLoginForm()}} className='bg-transparent text-indigo-600 px-5 py-1 '>Valider</button>
        </form>
    );
};

export default Login;