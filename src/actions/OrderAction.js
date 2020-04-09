import axios from "axios";
import CONST from "../consts";

export const getAcceptOrder = (lang , order_id , token  , room , message, props) => {
    return (dispatch) => {

        axios({
            url         : CONST.url + 'provider/accept-order',
            method      : 'POST',
            data        : { lang , order_id },
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'getAcceptOrder', payload: response.data})
            if (response.data.key == 1){

                axios({
                    url         :  CONST.url + 'send_message',
                    method      :  'POST',
                    data        :  { lang , order_id , room , message },
                    headers     :  {Authorization: token}
                }).then(response => {
                    dispatch({type: 'sendWelcomeMessage', payload: response.data})
                    if (response.data.key == 1){
                        props.navigation.navigate('chat')
                    }
                })
            }
        })
    }
};

export const getAcceptDelegateOrder = (lang , order_id , token  , props) => {
    return (dispatch) => {

        axios({
            url         : CONST.url + 'delegate/accept-order',
            method      : 'POST',
            data        : { lang , order_id },
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'getAcceptDelegateOrder', payload: response.data})
            if (response.data.key == 1){
                props.navigation.navigate('confirmation')
            }
        })

    }
};

