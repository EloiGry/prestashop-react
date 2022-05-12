import React from 'react';
import axios from 'axios';
import { createContext, useState, useEffect } from "react"

const apiKey = '3I6XUGSZG1Z7TYM9XV2MJNX8936HNQN7'
const dataType = 'output_format=JSON'
// creation de mon context 
const OptionsContext = createContext({})

const OptionsContextProvider = props => {
    const [options, setOptions] = useState()
    
    useEffect(() => {
        getOptionsProducts()
    },[])
    // function qui fetch sur mes line item
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
    //  dans cette variable value je met mon state line item et celui qui permet de stocker dedans 
    const value = {
        options,
        setOptions,
    }
    return (
        <OptionsContext.Provider value = {value}>
            {props.children}
        </OptionsContext.Provider>
    );
};

export {
    OptionsContextProvider,
    OptionsContext
}