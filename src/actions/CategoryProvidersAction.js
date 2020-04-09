import axios from "axios";
import CONST from "../consts";
import { Toast } from 'native-base'
import i18n from "../../locale/i18n";

export const categoryProviders = ( lang , category_id ) => {

    return (dispatch) => {
        axios({
            url         : CONST.url + 'category/providers',
            method      : 'POST',
            data        : { lang , category_id }
        }).then(response => {

            dispatch({type: 'categoryProviders', payload: response.data});

            if(response.data.data.length === 0){
                Toast.show({
                    text        : i18n.t('nopro'),
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

export const searchProviders = ( { lang , keyword  , category_id} ) => {

    return (dispatch) => {
        axios({
            url         : CONST.url + 'search/providers',
            method      : 'POST',
            data        : { lang , keyword , category_id }
        }).then(response => {

            dispatch({type: 'categoryProviders', payload: response.data});

            console.log('data ==', response.data);

            if(response.data.data.length === 0){
                Toast.show({
                    text        : i18n.t('nopro'),
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

export const filterProviders = ( { lang , city_id , rate, category_id } ) => {

    return (dispatch) => {
        axios({
            url         : CONST.url + 'filter/providers',
            method      : 'POST',
            data        : { lang , city_id , rate, category_id }
        }).then(response => {

            dispatch({type: 'categoryProviders', payload: response.data});

            if(response.data.data.length === 0){
                Toast.show({
                    text        : i18n.t('nopro'),
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

export const city = ( { lang } ) => {

    return (dispatch) => {
        axios({
            url         : CONST.url + 'cities',
            method      : 'POST',
            data        : { lang }
        }).then(response => {
            dispatch({type: 'city', payload: response.data});
            console.log('data ==', response.data);
        });
    }

};
