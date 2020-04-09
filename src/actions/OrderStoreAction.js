import axios from "axios";
import CONST from "../consts";


export const getOrderStore = (lang , provider_id , payment_type , shipping_price , lat , lng , address , token , props , code) => {
    return (dispatch) => {

        axios({
            url         : CONST.url + 'orders/store',
            method      : 'POST',
            data        : { lang , provider_id , payment_type , shipping_price , lat , lng , address , code },
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'getOrderStore', payload: response.data})
            if (response.data.key == 1){
                props.navigation.navigate('ConfirmPayment')
            }
        })

    }
};