import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const apiKey = '3I6XUGSZG1Z7TYM9XV2MJNX8936HNQN7'
const dataType = 'output_format=JSON'

const NavBar = () => {
    const [categories, setCategories] = useState(null)

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


    return (
        <div className='w-screen flex items-center justify-between bg-zinc-200 fixed drop-shadow-lg p-5'>
            <h1 className='font-bold ml-4'> Mode & Accessoires.</h1>
            <div className='flex items-center'>
                {categories?.map(categorie => {
                    return (
                        <Link key={categorie.id} to={categorie.link_rewrite} className='mx-2'> {categorie.name} </Link>
                    )
                })}
            </div>
            <div className='flex mr-4'>
                    <button className='bg-transparent text-indigo-600 px-5 py-1 mr-4'>Sign In</button>
                    <button className='px-5 py-1'>Sign Up</button>
            </div>
        </div>
    );
};

export default NavBar;