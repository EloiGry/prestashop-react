import React from 'react';
import { useState, useEffect, useContext} from 'react';
import axios from "axios"
import NavBar from '../components/NavBar';
import ShoppingCart from '../components/icons/ShoppingCart';
import Search from '../components/icons/Search';
import { Link } from 'react-router-dom';
import Modal from '../components/Modal';
import { OptionsContext } from "../context/options"
import { UserContext } from '../context/User';
// import Cookies from 'js-cookie'

const apiKey = '3I6XUGSZG1Z7TYM9XV2MJNX8936HNQN7'
const dataType = 'output_format=JSON'

const Home = () => {

    const [products, setProducts] = useState(null)
    const [modalOn, setModalOn] = useState(false);
    const [choice, setChoice] = useState(false);
    const [modalData, setModalData] = useState()
    const [filter, setFilter] =useState()
    const {options} = useContext(OptionsContext)
    const {auth, user} = useContext(UserContext)


    useEffect(() => {
        getProducts()
    }, [])

    useEffect(() => {
        let array = []
            modalData?.associations.product_option_values.forEach(item => array.push(Number(item.id)))
            const filter = options?.filter((item) => array.includes(item.id))
            setFilter(filter)
    }, [modalData])

    // useEffect(() => {
    //     readCookie()
    // }, [])

    // const readCookie = () => {
    //     const user = Cookies.get('user_session')
    //     if (user) {
    //         setAuth(true)
    //     }
    // }

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

    const attribute_1 = filter?.filter(item => item.id_attribute_group === '1')
    const attribute_2 = filter?.filter(item => item.id_attribute_group === '2')
    const attribute_3 = filter?.filter(item => item.id_attribute_group === '3')
    const attribute_4 = filter?.filter(item => item.id_attribute_group === '4')

    console.log("auth", auth);
    console.log("user", user);
    return (
        <div>
            <NavBar/>
            <div className='grid grid-cols-3 pt-[70px]'>
                {products?.map(product => {
                    const image = Number(product.id_default_image)
                    return (
                        <>
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
                                            <button className='px-5 py-1 w-full flex justify-center items-center' onClick={() => {setModalOn(true); setModalData(product)}}>
                                                <p> Ajouter au panier </p>
                                                <ShoppingCart/>
                                            </button>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </>

                    )
                } 
                )}
            </div>
            {modalOn && <Modal 
                setModalOn={setModalOn} 
                setChoice={setChoice} 
                src={`http://localhost/shop/api/images/products/${modalData.id}/${modalData.id_default_image}&ws_key=${apiKey}`} 
                attribute_1={attribute_1}
                attribute_2={attribute_2}
                attribute_3={attribute_3}
                attribute_4={attribute_4}
            />}
        </div>
    );
};

export default Home;
