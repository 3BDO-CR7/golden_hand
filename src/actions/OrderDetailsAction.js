import axios from "axios";
import CONST from "../consts";


export const getOrderDetails = (lang , order_id ) => {
    return (dispatch) => {

        axios({
            url         : CONST.url + 'orders/order-details',
            method      : 'POST',
            data        : { lang , order_id },
            // headers: {Authorization: token}
        }).then(response => {
            dispatch({type: 'getOrderDetails', payload: response.data})
        })

    }
};
