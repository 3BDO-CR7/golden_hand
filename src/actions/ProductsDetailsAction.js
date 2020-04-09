import axios from "axios";
import CONST from "../consts";
import {AsyncStorage} from "react-native";
import {Toast} from "native-base";

export const productDetails = (lang, product_id, token) => {
	return (dispatch) => {
		getProduct(lang, product_id, token, dispatch)
	}

};

export const addComment = ( lang , product_id , token, comment, rate ) => {

	return (dispatch) => {

		axios({
			url         : CONST.url + 'comments/store',
			method      : 'POST',
			headers     : token != null ? { Authorization: token } : null,
			data        : { lang, product_id, comment , rate}
		}).then(response => {
			getProduct(lang, product_id, token, dispatch);

			Toast.show({
					text        : response.data.msg,
					type        : response.data.key === 1 ? "success" : "danger",
					duration    : 3000,
				textStyle       : {
					color           : "white",
					fontFamily      : 'cairo',
					textAlign       : 'center'
				}
			});
		});

	}

};


const getProduct = (lang, product_id, token, dispatch) => {
	AsyncStorage.getItem('deviceID').then(device_id => {
		axios({
			url: CONST.url + 'products/details',
			method: 'POST',
			headers: token != null ? {Authorization: token} : null,
			data: {lang, product_id}
		}).then(response => {
			dispatch({type: 'productDetails', payload: response.data.data});
		});
	});
}
