import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios"

const apiKey = '3I6XUGSZG1Z7TYM9XV2MJNX8936HNQN7'
const dataType = 'output_format=JSON'

const Home = () => {

    const [products, setProducts] = useState(null)

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
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
            <div className='flex items-center justify-between h-[80px]'>
                <h1> Hello Shop !!!</h1>
                <div className='flex'>
                    <button className='bg-transparent text-indigo-600 px-8 py-3 mr-4'>Sign In</button>
                    <button className='px-8 py-3'>Sign Up</button>
                </div>
            </div>
            {products?.map(product => {
                const image = Number(product.id_default_image)
                return (
                    <div key={product.id}>
                        <p>{product.name}</p>  
                        <p> {product.price} </p>
                        <img className="rounded-md "src={`http://localhost/shop/api/images/products/${product.id}/${image}&ws_key=${apiKey}`} alt={product.name} width='200px'/>
                        <div className='flex'>
                            <button className='bg-transparent text-indigo-600 px-8 py-3 mr-4'>Voir plus</button>
                            <button className='px-8 py-3'>Ajouter au panier</button>
                        </div>
                    </div>
                )
            } 
    
            )}
        </div>
    );
};

export default Home;
