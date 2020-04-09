import axios from "axios";
import CONST from "../consts";



export const getCartProducts = (lang, provider_id , token) => {
    return (dispatch) => {
        CartProducts(lang, provider_id, token, dispatch)
    }
};

export const deleteCart = (lang , provider_id, cart_id, token, props) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'carts/delete',
            method: 'POST',
            data: {lang , cart_id},
            headers: {Authorization: token}
        }).then(response => {
            CartProducts(lang , provider_id , token , dispatch, props)
        })

    }
};

export const editCart = (lang , provider_id, cart_id, quantity,  token, props) => {
	return (dispatch) => {

		axios({
			url: CONST.url + 'carts/edit-quantity',
			method: 'POST',
			data: {lang , cart_id, quantity},
			headers: {Authorization: token}
		}).then(response => {
			CartProducts(lang , provider_id , token , dispatch, props)
		})

	}
};

const CartProducts = (lang , provider_id , token , dispatch, props ) => {
    axios({
        url: CONST.url + 'carts/products',
        method: 'POST',
        data: {lang , provider_id},
        headers: {Authorization: token}
    }).then(response => {
        if ((response.data.data).length <= 0){
            return props.navigation.navigate('Basket')
	    }else
            dispatch({type:'getCartProducts', payload: response.data})
    })
};
