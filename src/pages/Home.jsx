import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios"
import NavBar from '../components/NavBar';
import ShoppingCart from '../components/icons/ShoppingCart';
import Search from '../components/icons/Search';
import { Link } from 'react-router-dom';

const apiKey = '3I6XUGSZG1Z7TYM9XV2MJNX8936HNQN7'
const dataType = 'output_format=JSON'

const Home = () => {

    const [products, setProducts] = useState(null)

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        console.count()
        await axios.get(`http://localhost/shop/api/products&display=full&ws_key=${apiKey}?${dataType}`)
            .then(function (response) {
                const products = response.data.products
                setProducts(products)
            })

            .catch(function (error) {
                console.log(error);
            })
    }

    if (!products) {
        return (

            <p>Loading...</p>
        )

    }
    console.log(products);
    return (
        <div>
            <NavBar/>
            <div className='grid grid-cols-3 pt-[70px]'>
                {products?.map(product => {
                    const image = Number(product.id_default_image)
                    return (
                        <div key={product.id} className='m-10' >
                            <div className='card'> 
                                <img className="rounded-md w-full" src={`http://localhost/shop/api/images/products/${product.id}/${image}&ws_key=${apiKey}`} alt={product.name}/>
                                <p className='px-2 font-bold truncate pt-2'>{product.name}</p>  
                                <p className='px-2 font-semibold pb-2'> {Number(product.price).toFixed(2)}€</p>
                                <div className='flex flex-col'>
                                    <button className='bg-transparent text-indigo-600 px-5 py-1 mr-4 w-full flex justify-center items-center'>
                                        <Link to={`/product/${product.id}`}> Voir plus </Link>
                                        <Search/>
                                    </button>
                                    <div>
                                        <button className='px-5 py-1 w-full flex justify-center items-center'>
                                            <p> Ajouter au panier </p>
                                            <ShoppingCart/>
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                } 
        
                )}
            </div>
        </div>
    );
};

export default Home;
