import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";
import { AsyncStorage } from 'react-native';

export const favorite = ( lang , product_id , token ) => {

    return (dispatch) => {

        AsyncStorage.getItem('deviceID').then(device_id => {
            axios({
                url         : CONST.url + 'products/set-fav',
                method      : 'POST',
                headers     : token != null ? { Authorization: token } : null,
                data        : { lang, product_id, device_id }
            }).then(response => {
                returnFav(lang, token, dispatch);
            });
        });

    }

};

export const getFavs = ( lang, token ) => {

	return (dispatch) => {
		returnFav(lang, token, dispatch)
	}
};

const returnFav = (lang, token, dispatch) => {
	AsyncStorage.getItem('deviceID').then(device_id => {
		axios({
			url         : CONST.url + 'favourites',
			method      : 'POST',
			headers     : token != null ? { Authorization: token } : null,
			data        : { lang, device_id }
		}).then(response => {
			dispatch({type: 'get_favs', payload: response.data});
		});
	});
}
