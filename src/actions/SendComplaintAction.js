import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const complaint = (data) => {
    return (dispatch) => {

            axios({
                url         : CONST.url + 'send-complaint',
                method      : 'POST',
                data: {
                    complaint       : data.message,
                    lang            : data.lang
                }
            }).then(response => {
                dispatch({type: 'complaint', payload: response.data});

                Toast.show({
                    text        : response.data.msg,
                    type        : response.data.key === 1 ? "success" : "danger",
                    duration    : 3000,
                    textStyle   : {
                        color       : "white",
                        fontFamily  : 'cairo',
                        textAlign   : 'center'
                }
                });
            });

    }
};
