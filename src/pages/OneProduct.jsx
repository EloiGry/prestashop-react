import React from 'react';
import axios from 'axios';
import { useEffect, useState} from 'react';
import { useParams} from 'react-router-dom'
// import NavBar from '../components/NavBar';
import ShoppingCart from '../components/icons/ShoppingCart';

const apiKey = '3I6XUGSZG1Z7TYM9XV2MJNX8936HNQN7'
const dataType = 'output_format=JSON'

const OneProduct = () => {
    console.count("render numéro")
     // Initial state, useEffect...

     const [product, setProduct] = useState(null)
     const [options, setOptions] = useState(null)
     const [filter, setFilter] = useState(null)
     const {id} = useParams()
     
 
     useEffect(() => {
         getProduct()
         // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [])

     useEffect(() => {
        getOptionsProducts()
    }, [])

    useEffect(() => {
        optionsValues()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options])
 
 
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

    const getOptionsProducts = async () => {
        await axios.get(`http://localhost/shop/api/product_option_values&display=full&filter[id_attribute_group]=[1,4]&ws_key=${apiKey}?${dataType}`)
            .then(function (response) {
                const options = response.data.product_option_values
                setOptions(options)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const optionsValues = async() => {
        let array = []
            product?.associations.product_option_values.forEach(item => array.push(Number(item.id)))
            const filter = options?.filter((item) => array.includes(item.id))
            setFilter(filter)
    }
    

    if (!product || !options) {
        return (
            <p>Loading...</p>
        )
    }

    console.log(filter);
    console.log(product);
    const attribute_1 = filter?.filter(item => item.id_attribute_group === '1')
    const attribute_2 = filter?.filter(item => item.id_attribute_group === '2')
    const attribute_3 = filter?.filter(item => item.id_attribute_group === '3')
    const attribute_4 = filter?.filter(item => item.id_attribute_group === '4')

    console.log(attribute_1, attribute_2, attribute_3, attribute_4);

    return (
        <div>
            {/* <NavBar/> */}
            <div className='card flex items-center h-screen w-screen justify-center p-8 '> 
                <img className="rounded-md h-[400px] pr-10" src={`http://localhost/shop/api/images/products/${product.id}/${Number(product.id_default_image)}&ws_key=${apiKey}`} alt={product.name}/>
                <div className='pl-10'>
                    <p className='px-2 font-bold truncate pt-2 my-2'>{product.name}</p>  
                    <p className='px-2 font-semibold pb-2 my-2'> {Number(product.price).toFixed(2)}€</p>
                    <p> {product.description_short.replace(/<p[^>]*>/g, "").replace(/<\/?p[^>]*>/g, "")} </p>
                    <p> {product.description.replace(/<p[^>]*>/g, "").replace(/<\/?p[^>]*>/g, "")} </p>
                    <div> 
                        {attribute_1.length > 0 &&
                            <label className="mt-4 flex items-center">
                            <p className="text-gray-700 mr-2">Taille : </p>
                            <select className="form-select ml-2 block w-20 border-2">
                                {attribute_1.map(item => {
                                    return (
                                        <option>{item.name}</option>
                                    )
                                })}
                            </select>
                          </label>
                        } 
                    </div>
                    <div>
                        {attribute_2.length > 0 && 
                        <div className='flex'> 
                            <p> Couleur :  </p>
                            {attribute_2.map(item => {
                                return (
                                    <button className='w-5 m-1' style={{backgroundColor: item.color, border: '1px solid black'}}> </button>
                                )
                            })}

                        </div>
                        } 
                    </div>
                    <div> 
                        {attribute_3.length > 0 &&
                            <p> 3 </p>
                        } 
                    </div>
                    <div>
                        {attribute_4.length > 0 && 
                            <p> 4 </p>
                        } 
                    </div>
                    <div className='my-2'>
                        <button className='px-5 py-1 w-full flex justify-center items-center'>
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