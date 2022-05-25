import React from 'react';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import ShoppingCart from './icons/ShoppingCart';
import { UserContext } from '../context/User';
import Cookies from 'js-cookie';
const apiKey = '3I6XUGSZG1Z7TYM9XV2MJNX8936HNQN7'
const dataType = 'output_format=JSON'

const NavBar = () => {
    const [categories, setCategories] = useState(null)
    const {auth, setAuth, setUser} = useContext(UserContext)

    useEffect(() => {
        getCategories()
    }, [])

    const getCategories = () => {
        axios.get(`http://localhost/shop/api/categories&display=full&filter[id_parent]=[2]&ws_key=${apiKey}?${dataType}`)
        .then(function (response) {
            setCategories(response.data.categories)
        })

        .catch(function (error) {
            console.log(error);
        })
    }

    const handleClick = () => {
        Cookies.remove('user_session')
        setAuth(false)
        setUser(null)
    }


    return (
        <div className='w-screen flex items-center justify-between bg-zinc-200 fixed drop-shadow-lg p-5'>
            <h1 className='font-bold ml-4'> Mode & Accessoires.</h1>
            <div className='flex items-center'>
                {categories?.map(categorie => {
                    return (
                        <Link key={categorie.id} to={`/${categorie.link_rewrite}`} className='mx-2'> {categorie.name} </Link>
                    )
                })}
            </div>
            <div className='flex mr-4 items-center'>
                <Link to='/cart' className='py-1 px-5'> <ShoppingCart /></Link>
                {!auth && <Link to='/login'> <button className='bg-transparent text-indigo-600 px-5 py-1 mr-4'>Sign In</button> </Link>}
                {!auth && <Link to='/signup'><button className='px-5 py-1'>Sign Up</button></Link>}
                {auth && <button onClick={handleClick} className='bg-transparent text-indigo-600 px-5 py-1 mr-4'>Logout</button>}
            </div>
        </div>
    );
};

export default NavBar;