import React from 'react';
import axios from 'axios';
import { useEffect, useState, useContext} from 'react';
import { useParams} from 'react-router-dom'
import NavBar from '../components/NavBar';
import ShoppingCart from '../components/icons/ShoppingCart';
import { OptionsContext } from "../context/options"
import { UserContext } from '../context/User';
import { CartContext } from '../context/Cart';


const apiKey = '3I6XUGSZG1Z7TYM9XV2MJNX8936HNQN7'
const dataType = 'output_format=JSON'

const OneProduct = () => {
    console.count("render numéro")
     const [product, setProduct] = useState(null)
     const [combinations, setCombinations] = useState(null)
     const [productAttribute, setProductAttribute] = useState()
     const [filter, setFilter] = useState(null)
     const [size, setSize] = useState(1)
     const [color, setColor] = useState()
     const [measure, setMeasure] = useState()
     const [shape, setShape] = useState()
     const [counter, setCounter] = useState(1)
     const {id} = useParams()
     const {options} = useContext(OptionsContext)
     const {user} = useContext(UserContext)
     const {cart, setCart, getOneCart} = useContext(CartContext)
 
     useEffect(() => {
         getProduct()
         // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [])

     useEffect(() => {
        getCombinations()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {
        optionsValues()
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product])

    useEffect(() => {
        createCart()
    }, [productAttribute])
 
    // Call API 
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

    const getCombinations = async() => {
        await axios.get(`http://localhost/shop/api/combinations&display=full&ws_key=${apiKey}?${dataType}`)
            .then(function (response) {
                const combinations = response.data.combinations
                setCombinations(combinations)
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    const createCart = async() => {
        var xmlBodyStr = `<prestashop xmlns:xlink="http://www.w3.org/1999/xlink">
        <cart>
          <id_currency>1</id_currency>
          <id_customer>${user ? user.id : "<![CDATA[]]>"}</id_customer>
          <id_lang>1</id_lang>
          <associations>
            <cart_rows>
              <cart_row>
                <id_product>${product.id}</id_product>
                <id_product_attribute>${productAttribute}</id_product_attribute>
                <quantity>${counter}</quantity>
              </cart_row>
            </cart_rows>
          </associations>
        </cart>
      </prestashop>
      `
    
    var config = {
        headers: {'Accept': 'application/json, application/xml, text/plain, text/html, *.*'}
    };
    
            await axios.post(`http://localhost/shop/api/carts&ws_key=${apiKey}`, xmlBodyStr, config)
              .then(function (response) {
                console.log(response.data)
              })
              .catch(function (error) {
                console.log(error);
              });
        }


    const optionsValues = async() => {
        let array = []
            product?.associations.product_option_values.forEach(item => array.push(Number(item.id)))
            const filter = options?.filter((item) => array.includes(item.id))
            setFilter(filter)
    }
    
   
        const attribute1 = filter?.filter(item => item.id_attribute_group === '1')
        const attribute2 = filter?.filter(item => item.id_attribute_group === '2')
        const attribute3 = filter?.filter(item => item.id_attribute_group === '3')
        const attribute4 = filter?.filter(item => item.id_attribute_group === '4')
       
    if (!product || !options) {
        return (
            <p>Loading...</p>
        )
    }


    const handleSize = (event) => {
        const select = event.target;
        const id = select.children[select.selectedIndex].id;
        setSize(id)
    }

    const handleMeasure = (event) => {
        const select = event.target;
        const id = select.children[select.selectedIndex].id;
        setMeasure(id)
    }

    const handleShape = (event) => {
        const select = event.target;
        const id = select.children[select.selectedIndex].id;
        setShape(id)
    }

    const handleMinusClick = () => {
        if(counter > 0) {
            setCounter(counter -1)
        }
    }

    const handlePlusClick = () => {
        setCounter(counter + 1)
    }
    
    

    const getProductAttribute = () => {
        let array = []
        if (typeof size !== 'undefined') {
            array.push({id: size.toString()})
        }
        if (typeof color !== 'undefined') {
            array.push({id: color.toString()})
        }
        if (typeof measure !== 'undefined') {
            array.push({id: measure.toString()})
        }
        if (typeof shape !== 'undefined') {
            array.push({id: shape.toString()})
        }
        const findCombination = combinations.find(item => JSON.stringify(item.associations.product_option_values) == JSON.stringify(array));
        setProductAttribute(findCombination.id)
        
    }

    console.log("product" ,product.id);
    console.log("pa" ,productAttribute);
    console.log("counter" ,counter);
    
    return (
        <div>
            <NavBar/>
            <div className='card flex items-center h-screen w-screen justify-center pt-10 px-10'> 
                <img className="rounded-md h-[400px] pr-10" src={`http://localhost/shop/api/images/products/${product.id}/${Number(product.id_default_image)}&ws_key=${apiKey}`} alt={product.name}/>
                <div className='pl-10'>
                    <p className='px-2 font-bold truncate pt-2 my-2'>{product.name}</p>  
                    <p className='px-2 font-semibold pb-2 my-2'> {Number(product.price).toFixed(2)}€</p>
                    <p className='text-sm'> {product.description_short.replace(/<p[^>]*>/g, "").replace(/<\/?p[^>]*>/g, "")} </p>
                    <p className='text-sm'> {product.description.replace(/<p[^>]*>/g, "").replace(/<\/?p[^>]*>/g, "")} </p>
                    <div> 
                        {attribute1?.length > 0 &&
                        <>
                            <label className="mt-4 flex items-center">
                            <p className="mr-2">Taille : </p>
                            <select className="form-select ml-2 block w-20 border-2" onChange={handleSize}>
                                {attribute1.map(item => {
                                    return (
                                        <option key={item.id} id={item.id}>{item.name}</option>
                                    )
                                })}
                            </select>
                          </label>
                        </>
                        } 
                    </div>
                    <div>
                        {attribute2?.length > 0 && 
                        <div className='flex'> 
                            <p> Couleur :  </p>
                            {attribute2.map(item => {
                                return (
                                    <button key={item.id} className='w-5 m-1' style={{backgroundColor: item.color, border: '1px solid black'}} onClick={() => setColor(item.id)}> </button>
                                )
                            })}

                        </div>
                        } 
                    </div>
                    <div> 
                        {attribute3?.length > 0 &&
                            <label className="mt-4 flex items-center">
                            <p className="mr-2">Mesure : </p>
                            <select className="form-select ml-2 block w-25 border-2" onChange={handleMeasure}>
                                {attribute3.map(item => {
                                    return (
                                        <option key={item.id} id={item.id}>{item.name}</option>
                                    )
                                })}
                            </select>
                          </label>
                        } 
                    </div>
                    <div>
                        {attribute4?.length > 0 && 
                            <label className="mt-4 flex items-center">
                                <p className="mr-2">Forme : </p>
                                <select className="form-select ml-2 block w-25 border-2" onChange={handleShape}>
                                    {attribute4.map(item => {
                                        return (
                                            <option key={item.id} id={item.id}>{item.name}</option>
                                        )
                                    })}
                                </select>
                          </label>
                        } 
                    </div>
                    <div>
                        <p> Quantity : <button className='w-5 m-1' onClick={handleMinusClick}> - </button> {counter} <button className='w-5 m-1' onClick={handlePlusClick}> + </button></p>
                    </div>
                    <div className='my-2'>
                        <button className='px-5 py-1 w-full flex justify-center items-center' onClick={getProductAttribute}>
                            <p> Ajouter au panier </p>
                            <ShoppingCart/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OneProduct;