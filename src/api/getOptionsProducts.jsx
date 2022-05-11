import axios from "axios"

const apiKey = '3I6XUGSZG1Z7TYM9XV2MJNX8936HNQN7'
const dataType = 'output_format=JSON'

const getOptionsProducts = async () => {
    await axios.get(`http://localhost/shop/api/product_option_values&display=full&filter[id_attribute_group]=[1,4]&ws_key=${apiKey}?${dataType}`)
        .then(function (response) {
            // console.log(response.data.product_option_values);
            return (response.data.product_option_values)
        })

        .catch(function (error) {
            console.log(error);
        })
}

export default getOptionsProducts