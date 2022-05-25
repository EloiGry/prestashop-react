import { createContext, useState, useEffect} from "react";
import Cookies from "js-cookie";
import axios from "axios";
const apiKey = '3I6XUGSZG1Z7TYM9XV2MJNX8936HNQN7'
const dataType = 'output_format=JSON'


const UserContext = createContext({})

const UserContextProvider = ({children}) => {
    const [auth, setAuth] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        readCookie()
    }, [])

    const readCookie = () => {
        const user = Cookies.get('user_session')
        if (user) {
            setAuth(true)
            axios.get(`http://localhost/shop/api/customers&display=full&filter[secure_key]=${user}&ws_key=${apiKey}?${dataType}`)
            .then(function (response) {
                        setUser(response.data.customers[0])
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }

    const value = {
        auth,
        setAuth,
        readCookie,
        user,
        setUser
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export {
    UserContext,
    UserContextProvider
}