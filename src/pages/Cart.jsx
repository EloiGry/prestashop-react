import React from 'react';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/Cart';
import { OptionsContext } from '../context/options';

const apiKey = '3I6XUGSZG1Z7TYM9XV2MJNX8936HNQN7'
const dataType = 'output_format=JSON'

const Cart = () => {
    const {cart} = useContext(CartContext)
    const {options} = useContext(OptionsContext)
    const [combinations, setCombinations] = useState()
    const [products, setProducts] = useState()
    console.log("options", options);

    useEffect(() => {
      getProducts() 
    }, [cart])

    useEffect(() => {
        getCombinations()
      }, [cart])
    
    console.log(cart, "cArt");
    let array = []
    cart?.associations?.cart_rows.forEach(item => array.push(item.id_product))
    const filterProducts = array.join('|')

    let arrayCombinations = []
    cart?.associations?.cart_rows.forEach(item => arrayCombinations.push(item.id_product_attribute))
    const filterCombinations = arrayCombinations.join('|')
    



    const getProducts = async () => {
        await axios.get(`http://localhost/shop/api/products&display=full&filter[id]=[${filterProducts}]&ws_key=${apiKey}?${dataType}`)
            .then(function (response) {
                setProducts(response.data.products);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const getCombinations = async () => {
        await axios.get(`http://localhost/shop/api/combinations&display=full&filter[id]=[${filterCombinations}]&ws_key=${apiKey}?${dataType}`)
            .then(function (response) {
                setCombinations(response.data.combinations);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    

    if (!cart) {
        return (
            <p>Aucun articles dans le panier</p>
        )
    }

    console.log('comb' ,combinations);

    let arrayC = []
    let arrayTotal = []

    combinations?.forEach(item => {
        item.associations.product_option_values.forEach(value => {
            arrayC.push(Number(value.id))
        })
        const filter = options.filter(element => arrayC.includes(element.id))
        console.log("filter" ,filter);
        arrayTotal.push(filter)
        arrayC = []
    })
    console.log("AT", arrayTotal);
    console.log("products" ,products);
    console.count()
    return (
        <>
            <h2>Les éléments de votre panier </h2>
            <div>
            {products?.map((product, index) => {
                console.log("index" ,index);
                return (
                    <div className='flex d-flex'>
                        <img className="rounded-md h-[75px] pr-10 m-2" src={`http://localhost/shop/api/images/products/${product.id}/${Number(product.id_default_image)}&ws_key=${apiKey}`} alt={product.name}/>  
                        <p className='m-2'> {product.name} </p>
                        <p className='m-2'> Quantité : {cart.associations.cart_rows[index].quantity} </p>
                        {arrayTotal[index].map(item => {
                            return (
                                <>
                                  <p className='m-2'> {item.name} </p>
                                </>
                            )
                        })}
                    </div>
                )
            })}
            </div>
        </>
    );
};

export default Cart;