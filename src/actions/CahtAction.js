import axios from "axios";
import CONST from "../consts";

export const get_rooms = (lang,token,props) => {
    return (dispatch) => {
        axios({
            url         :  CONST.url + 'rooms',
            method      : 'POST',
            data        : { lang },
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'get_rooms', payload: response.data})
        })
    }
};
