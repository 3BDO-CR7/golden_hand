import axios from "axios";
import CONST from "../consts";


export const getTerms = lang => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'app-terms',
            method      : 'POST',
            data        : { lang }
        }).then(response => {
            dispatch({type: 'getTerms', payload: response.data});
        });
    }
};
