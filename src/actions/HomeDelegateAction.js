import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";
import i18n from "../../locale/i18n";

export const homeDelegate = ( lang , status, token) => {

    return (dispatch) => {
        axios({
            url         : CONST.url + 'orders',
            method      : 'POST',
            data        : { lang , status },
            headers     : { Authorization: token }
        }).then(response => {
            dispatch({type: 'homeDelegate', payload : response.data});
            if(response.data.data.length === 0){
                Toast.show({
                    text        : i18n.t('nodata'),
                    type        : "danger",
                    duration    : 3000,
                    textStyle   : {
                        color           : "white",
                        fontFamily      : 'cairo',
                        textAlign       : 'center'
                    }
                });
            }
        });
    }

};
