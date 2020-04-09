import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";
import { AsyncStorage } from 'react-native';

export const addCart = ( lang , product_id , token, quantity , props) => {

    return (dispatch) => {

        AsyncStorage.getItem('deviceID').then(device_id => {
            axios({
                url         : CONST.url + 'carts/store',
                method      : 'POST',
                headers     : token != null ? { Authorization: token } : null,
                data        : { lang, product_id, device_id, quantity }
            }).then(response => {
                dispatch({type: 'addCart', payload: response.data});
                if(response.data.key == 1){
                    props.navigation.navigate('Basket')
                }
                // Toast.show({
                //     text        : response.data.msg,
                //     type        : "danger",
                //     duration    : 3000,
                //     textStyle       : {
                //         color           : "white",
                //         fontFamily      : 'cairo',
                //         textAlign       : 'center'
                //     }
                // });
            });
        });

    }

};
