import React from 'react';
import axios from 'axios';
import { useEffect, useState, useContext} from 'react';
import { useParams} from 'react-router-dom'
import NavBar from '../components/NavBar';
import ShoppingCart from '../components/icons/ShoppingCart';
import { OptionsContext } from "../context/options"

const apiKey = '3I6XUGSZG1Z7TYM9XV2MJNX8936HNQN7'
const dataType = 'output_format=JSON'

const OneProduct = () => {
    console.count("render numéro")
     const [product, setProduct] = useState(null)
     const [filter, setFilter] = useState(null)
     const [size, setSize] = useState(1)
     const [color, setColor] = useState()
     const [measure, setMeasure] = useState()
     const [shape, setShape] = useState()
    //  const [attribute1, setAttribute1] = useState([])
    //  const [attribute2, setAttribute2] = useState([])
    //  const [attribute3, setAttribute3] = useState([])
    //  const [attribute4, setAttribute4] = useState([])
     const [counter, setCounter] = useState(1)
     const {id} = useParams()
     const {options} = useContext(OptionsContext)
     
 
     useEffect(() => {
         getProduct()
         // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [])


    useEffect(() => {
        optionsValues()
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product])

 
 
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

    const handleClickCart = () => {
        console.log(product);
    }
    

    console.log("size" ,size);
    console.log("color" ,color);
    console.log("measure" ,measure);
    console.log("shape" ,shape);
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
                        <button className='px-5 py-1 w-full flex justify-center items-center' onClick={handleClickCart}>
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