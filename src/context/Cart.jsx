import { createContext, useState,useEffect , useContext } from "react";
import { UserContext } from "./User";
import Cookies from "js-cookie";
const CartContext = createContext({})

const CartContextProvider = props => {
    const {auth, setAuth} = useContext(UserContext)
    const [cart, setCart] = useState()
    const [selectedDay, setSelectedDay] = useState()

    const API = "http://localhost:5000/carts"

    
    useEffect(() => {
        
        if(Cookies.getItem("id")) {
            fetchOneCart(localStorage.getItem("id"))
        }else {
            createCart({
                auth: auth ? auth._id : null
            })
        }

        if(user){
            if(!cart.user) {
                modifyCart(
                    cart._id,
                    {
                        user: user._id
                    }
                )  
            }
        }
    },[])



    
    const createCart = async values => {
        const response = await fetch (`${API}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(values)
        })
        if(response.status >= 400) {
            console.log("error");
        } else {
            const cartCreate = await response.json()
            setCart(cartCreate)
            localStorage.setItem("id", cartCreate._id)
        }
    }

    const modifyCart = async (id,values) => {
        const response = await fetch (`${API}/${id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(values)
        })
        if(response.status >= 400) {
            console.log("error");
        } else {
            const cartModified = await response.json()
            
        }
    }

  

    const fetchOneCart = async (id) => {
        const oneCart = await getOneCart(id)
        if (!oneCart) {
            createCart({
                user: user ? user._id : null
            })
        } else {
            setCart(oneCart)
        }
    }

    
    const value = {
        cart,
        setCart,
        fetchOneCart,
        createCart,
        selectedDay, 
        setSelectedDay
    }

    return (
        <CartContext.Provider value = {value}>
            {props.children}
        </CartContext.Provider>
    )

}

export {
    CartContextProvider,
    CartContext
}