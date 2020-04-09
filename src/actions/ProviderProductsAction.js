import axios from "axios";
import CONST from "../consts";
import {AsyncStorage} from "react-native";

export const providerProduct = ( lang , provider_id, token , sub_category_id ) => {

    return (dispatch) => {
		AsyncStorage.getItem('deviceID').then(device_id => {
            axios({
                url         : CONST.url + 'providers/products',
                method      : 'POST',
                headers     : token != null ? { Authorization: token } : null,
                data        : { lang , provider_id , sub_category_id, device_id },
            }).then(response => {
                dispatch({type: 'providerProduct', payload : response.data.data});
            });
		});
    }

};
