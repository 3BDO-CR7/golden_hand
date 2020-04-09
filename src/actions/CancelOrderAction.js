import axios from "axios";
import CONST from "../consts";


export const getCancelOrder = (lang , order_id , cancel_reason , token , props) => {
    return (dispatch) => {

        axios({
            url         : CONST.url + 'user/cancel-order',
            method      : 'POST',
            data        : { lang , order_id , cancel_reason  },
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'getCancelOrder', payload: response.data})
            if (response.data.key == 1){
                props.navigation.navigate('MyOrders')
            }
        })

    }
};

export const getDeleteOrder = (lang , order_id , token  , props) => {
    return (dispatch) => {

        axios({
            url         : CONST.url + 'order/delete',
            method      : 'POST',
            data        : { lang , order_id },
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'getDeleteOrder', payload: response.data})
            if (response.data.key == 1){
                props.navigation.navigate('MyOrders')
            }
        })

    }
};


export const getFinishOrder = (lang , order_id , token  , props) => {
    return (dispatch) => {

        axios({
            url         : CONST.url + 'user/finish-order',
            method      : 'POST',
            data        : { lang , order_id },
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'getFinishOrder', payload: response.data})
            if (response.data.key == 1){
                props.navigation.navigate('MyOrders')
            }
        })

    }
};
