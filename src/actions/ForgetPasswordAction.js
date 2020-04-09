import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const forgetPass = (data, lang, props) => {
    return (dispatch) => {

        axios({
            url         : CONST.url + 'forget-password',
            method      : 'POST',
            data        : {
                phone			    : data.phone,
                lang
            }
        }).then(response => {

            dispatch({type: 'forgetPass', payload: response.data});

           if (response.data.key === 1){

                props.navigation.navigate('NewPassword', { code : response.data.data.code, user_id : response.data.data.id });

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