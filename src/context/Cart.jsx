import { createContext, useState,useEffect , useContext } from "react";
import { UserContext } from "./User";
import XMLParser from 'react-xml-parser';
import axios from "axios";
const CartContext = createContext({})

const apiKey = '3I6XUGSZG1Z7TYM9XV2MJNX8936HNQN7'
const dataType = 'output_format=JSON'

const CartContextProvider = props => {
    const {user, setUser} = useContext(UserContext)
    const [cart, setCart] = useState()
    // const [selectedDay, setSelectedDay] = useState()

    
    useEffect(() => {
        
        if(localStorage.getItem("id")) {
            fetchOneCart(localStorage.getItem("id"))
        }else {
            createCart()
        }

        if(user){
            if(!cart[4].value || !cart[4].value == 0) {
                modifyCart(cart[0].value, user.id)  
            }
        }
    },[])



    
const createCart = async() => {
    var xmlBodyStr = `<prestashop xmlns:xlink="http://www.w3.org/1999/xlink">
    <cart>
      <id_currency>1</id_currency>
      <id_lang>1</id_lang>
    </cart>
  </prestashop>
  `

var config = {
    headers: {'Accept': 'application/json, application/xml, text/plain, text/html, *.*'}
};

        await axios.post(`http://localhost/shop/api/carts&ws_key=${apiKey}`, xmlBodyStr, config)
          .then(function (response) {
            var xml = new XMLParser().parseFromString(response.data); 
            const cart = xml.children[0].children
            setCart(cart)
            localStorage.setItem("id", cart[0].value)
          })
          .catch(function (error) {
            console.log(error);
          });
        // const response = await fetch (`${API}`, {
        //     method: 'post',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     credentials: 'include',
        //     body: JSON.stringify(values)
        // })
        // if(response.status >= 400) {
        //     console.log("error");
        // } else {
        //     const cart = await response.json()
        //     setCart(cart)
        //     localStorage.setItem("id", cart._id)
        // }
    }

    const modifyCart = async (id, userId) => {
        var xmlBodyStr = `<prestashop xmlns:xlink="http://www.w3.org/1999/xlink">
        <cart>
          <id_customer>${userId}</id_customer>
        </cart>
      </prestashop>
      `
    
    var config = {
        headers: {'Accept': 'application/json, application/xml, text/plain, text/html, *.*'}
    };
    
            await axios.put(`http://localhost/shop/api/carts/${id}&ws_key=${apiKey}`, xmlBodyStr, config)
              .then(function (response) {
                var xml = new XMLParser().parseFromString(response.data); 
                const cartModified = xml.children[0].children[4].value
              })
              .catch(function (error) {
                console.log(error);
              });
        // const response = await fetch (`${API}/${id}`, {
        //     method: 'put',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     credentials: 'include',
        //     body: JSON.stringify(values)
        // })
        // if(response.status >= 400) {
        //     console.log("error");
        // } else {
        //     const cartModified = await response.json()
            
        // }
    }

  

    const fetchOneCart = async(id) => {
        await axios.get(`http://localhost/shop/api/carts/${id}&ws_key=${apiKey}?${dataType}`)
            .then(function (response) {
                const cart = response.data.cart
                if (!cart) {
                    createCart()
                } else {
                    setCart(cart)
                }
            })

            .catch(function (error) {
                console.log(error);
            })
    }

    console.log("cart", cart)
    const value = {
        cart,
        setCart,
        fetchOneCart,
        createCart,
        // selectedDay, 
        // setSelectedDay
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