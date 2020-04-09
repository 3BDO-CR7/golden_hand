import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const newPass = (data , lang, props) => {
    return (dispatch) => {

        axios({
            url         : CONST.url + 'reset-password',
            method      : 'POST',
            data        : {
                code			        : data.code,
                password			    : data.password,
                user_id			        : data.user_id,
                lang
            }
        }).then(response => {

            dispatch({type: 'newPass', payload: response.data});

            if (response.data.key === 1){
                props.navigation.navigate('Login');
            }

            Toast.show({
                text        	: response.data.msg,
                type			: response.data.key === 1 ? "success" : "danger",
                duration    	: 3000,
                textStyle   	: {
                    color       	: "white",
                    fontFamily  	: 'cairo',
                    textAlign   	: 'center'
                }
            });

        })

    }
};