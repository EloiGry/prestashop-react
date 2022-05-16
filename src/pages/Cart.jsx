import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const apiKey = '3I6XUGSZG1Z7TYM9XV2MJNX8936HNQN7'
const dataType = 'output_format=JSON'

const Cart = () => {
    const [cart, setCart] = useState(null)
    useEffect(() => {
        getCart()
    }, [])

    const getCart = async() => {
        await axios.get(`http://localhost/shop/api/carts&display=full&ws_key=${apiKey}?${dataType}`)
                .then(function (response) {
                    const cart = response.data.carts
                    setCart(cart)
                })
                .catch(function (error) {
                    console.log(error);
                })
    }
    
    
    console.log(cart);
    return (
        <div>
            Vous etes sur votre panier
        </div>
    );
};

export default Cart;