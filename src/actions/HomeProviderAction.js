import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";
import i18n from "../../locale/i18n";

export const homeProvider = ( lang , sub_category_id, token) => {

    return (dispatch) => {
        axios({
            url         : CONST.url + 'provider/products',
            method      : 'POST',
            data        : { lang , sub_category_id },
            headers     : { Authorization: token }
        }).then(response => {

            dispatch({type: 'homeProvider', payload : response.data.data});

            if(response.data.data.products.length === 0){
                Toast.show({
                    text        : i18n.t('nodata'),
                    type        : "danger",
                    duration    : 3000,
                    textStyle   : {
                        color       : "white",
                        fontFamily  : 'cairo',
                        textAlign   : 'center'
                    }
                });
            }

        });
    }

};
