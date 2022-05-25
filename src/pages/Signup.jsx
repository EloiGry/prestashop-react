import React from 'react';
import { useFormik } from 'formik'
import axios from 'axios';

const Signup = () => {

    
    const formik = useFormik({
        initialValues: {
            customer : [
                {
                    firstname:"",
                    lastname:"",
                    email: "",
                    passwd:"",
                }
            ]
        },
        onSubmit: values => {
          Log(values)
        },
    });

    const Log = async values => {

    var xmlBodyStr = `<prestashop xmlns:xlink="http://www.w3.org/1999/xlink">
    <customer>
        <passwd>${values.passwd}</passwd>
        <lastname>${values.lastname}</lastname>
        <firstname>${values.firstname}</firstname>
        <email>${values.email}</email>
    </customer>
</prestashop>`

var config = {
    headers: {'Accept': 'application/json, application/xml, text/plain, text/html, *.*'}
};

        await axios.post('http://localhost/shop/api/customers&ws_key=3I6XUGSZG1Z7TYM9XV2MJNX8936HNQN7', xmlBodyStr, config)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        // const response = await fetch(`http://localhost/shop/api/customers&ws_key=3I6XUGSZG1Z7TYM9XV2MJNX8936HNQN7`, {
        //     method : 'post',
        //     credentials: 'includes',
        //     headers: {
        //   'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
        // },
        //     body:xmlBodyStr,
        // })
        // if(response.status >= 400) {
        //     // alert("Error")
        //     // const error = await response.json()
        //     console.log("error" ,response)
        // } else {
        //     // const user = await response.json()
        //     console.log("user", response)
        // }
    }

    
    return (
        <form onSubmit={formik.handleSubmit} className='flex flex-col items-center'>
            <input type='text' id="firstname" name="firstname" onChange={formik.handleChange} value={formik.values.firstname} placeholder='First name' className='border-solid border-2 m-5 p-2' />
            <input type='text' id="lastname" name="lastname" onChange={formik.handleChange} value={formik.values.lastname} placeholder='Last name' className='border-solid border-2 m-5 p-2'/>
            <input type='email' id="email" name="email" onChange={formik.handleChange} value={formik.values.email} placeholder='Mail' className='border-solid border-2 m-5 p-2' />
            <input type='password' id="passwd" name="passwd" onChange={formik.handleChange} value={formik.values.passwd} placeholder='Password' className='border-solid border-2 m-5 p-2'/>
            <button type='submit' className='bg-transparent text-indigo-600 px-5 py-1 '>Valider</button>
        </form>
    );
};

export default Signup;