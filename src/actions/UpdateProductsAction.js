import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const updateProduct = (data, props, lang, token , product_id) => {
    return (dispatch) => {

        axios({
            url         : CONST.url + 'products/update',
            method      : 'POST',
            headers     : { Authorization: token },
            data        : {
                product_id,
                name_ar			        : data.namePro,
                sub_category_id	        : data.kindPro,
                price			        : data.pricePro,
                discount		        : data.discount,
                description_ar		    : data.info,
                images			        : data.base64,
                lang
            }
        }).then(response => {

            dispatch({type: 'updateProduct', payload: response.data});

            if (response.data.key === 1){
                props.navigation.navigate('drawerNavigator');
            }

            Toast.show({
                text        	: response.data.msg,
                type			: response.data.key === 1 ? "success" : "danger",
                duration    	: 3000,
                textStyle   	: {
                    color       	: "white",
                    fontFamily  	: 'cairo',
                    textAlign   	: 'center'
                }
            });

        })

    }
};
export const deleteProductImage = (lang, token , product_image_id) => {
    return (dispatch) => {

        axios({
            url         : CONST.url + 'products/delete-image',
            method      : 'POST',
            headers     : { Authorization: token },
            data        : {
                product_image_id,
                lang
            }
        }).then(response => {

        })

    }
};