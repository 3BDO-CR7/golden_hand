import axios from "axios";
import CONST from "../consts";


export const getUserOrders = (lang , status , token) => {
    return (dispatch) => {

        axios({
            url         : CONST.url + 'orders',
            method      : 'POST',
            data        : { lang , status },
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'getUserOrders', payload: response.data})
        })

    }
};
