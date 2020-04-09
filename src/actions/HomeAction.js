import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";
import i18n from "../../locale/i18n";

export const sliderHome = lang => {

    return (dispatch) => {
        axios({
            url         : CONST.url + 'banners',
            method      : 'POST',
            data        : { lang }
        }).then(response => {
            dispatch({type: 'sliderHome', payload: response.data});
        });
    }

};

export const categoryHome = lang => {

    return (dispatch) => {
        axios({
            url         : CONST.url + 'categories',
            method      : 'POST',
            data        : { lang }
        }).then(response => {
            dispatch({type: 'categoryHome', payload: response.data});
        });
    }

};

export const searchHome = ( { lang , keyword } ) => {

    return (dispatch) => {
        axios({
            url         : CONST.url + 'search',
            method      : 'POST',
            data        : { lang , keyword }
        }).then(response => {
            dispatch({type: 'searchHome', payload: response.data});
            console.log('data Search ==', response.data);

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
