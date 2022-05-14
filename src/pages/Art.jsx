import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
const apiKey = '3I6XUGSZG1Z7TYM9XV2MJNX8936HNQN7'
const dataType = 'output_format=JSON'

const Art = () => {
    console.count();
    const [products, setProducts] = useState()

    useEffect(() => {
      getProducts()
    }, [])
    

    const getProducts = async () => {
        await axios.get(`http://localhost/shop/api/products&display=full&filter[id_category_default]=[7,8]&ws_key=${apiKey}?${dataType}`)
            .then(function (response) {
                const products = response.data.products
                setProducts(products)
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    
    console.log(products);
    return (
        <div>
            <NavBar/>
            <p className='pt-[100px]'> Hello art </p>
        </div>
    );
};

export default Art;