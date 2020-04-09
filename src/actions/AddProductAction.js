import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const addProduct = (data, props, lang, token) => {
    return (dispatch) => {

        axios({
            url         : CONST.url + 'products/store',
            method      : 'POST',
            headers     : { Authorization: token },
            data        : {
                name_ar			        : data.namePro,
                sub_category_id	        : data.kindPro,
                price			        : data.pricePro,
                discount		        : data.discount,
                description_ar		    : data.info,
                images			        : data.base64,
                lang
            }
        }).then(response => {

            dispatch({type: 'addProduct', payload: response.data});

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