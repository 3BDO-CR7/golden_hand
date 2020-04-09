import axios from "axios";
import CONST from "../consts";
import {AsyncStorage} from "react-native";


export const getCartList = (lang,token) => {
    return (dispatch) => {
        AsyncStorage.getItem('deviceID').then(device_id => {
            axios({
                url: CONST.url + 'carts/list',
                method: 'POST',
                data: {lang, device_id},
                headers: {Authorization: token}
            }).then(response => {
                dispatch({type: 'getCartList', payload: response.data})
            })

        })
    }
};
