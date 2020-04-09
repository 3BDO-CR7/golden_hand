import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const activeCode = (data , props, lang) => {
    return (dispatch) => {

        axios({
            url         : CONST.url + 'activate-account',
            method      : 'POST',
            data        : {
                code			    : data.code,
                lang
            }
        }).then(response => {

            dispatch({type: 'activeCode', payload: response.data});

            // Toast.show({
            //     text        	: response.data.msg,
            //     type			: response.data.key === 1 ? "success" : "danger",
            //     duration    	: 3000,
            //     textStyle   	: {
            //         color       	: "white",
            //         fontFamily  	: 'cairo',
            //         textAlign   	: 'center'
            //     }
            // });

        })

    }
};