import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

const OneProduct = () => {
    console.count()
    const [product, setProduct] = useState(null)
    const {id} = useParams()
    const apiKey = '3I6XUGSZG1Z7TYM9XV2MJNX8936HNQN7'
    const dataType = 'output_format=JSON'

    useEffect(() => {
        getProduct()
    }, [])

    const getProduct = async () => {
        await axios.get(`http://localhost/shop/api/products/${id}&ws_key=${apiKey}?${dataType}`)
            .then(function (response) {
                const product = response.data.product
                setProduct(product)
            })
    
            .catch(function (error) {
                console.log(error);
            })
    }
    console.log(product);
    return (
        <div>
            One product page
        </div>
    );
};

export default OneProduct;