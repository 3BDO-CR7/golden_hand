import axios from "axios";
import CONST from "../consts";


export const subCate = (lang, token) => {
    return (dispatch) => {

        axios({
            url         : CONST.url + 'sub-categories',
            method      : 'POST',
            data        : { lang },
            headers     : { Authorization: token },
        }).then(response => {
            dispatch({type: 'subCate', payload: response.data})
        })

    }
};
