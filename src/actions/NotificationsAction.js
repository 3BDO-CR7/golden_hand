import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";
import i18n from "../../locale/i18n";



export const getNotifications = (lang , token) => {
    return (dispatch) => {
        Notifications(lang, token, dispatch)
    }
};

export const deleteNotifications = (lang , notify_id, token) => {
    return (dispatch) => {

        axios({
            url         : CONST.url + 'delete-notification',
            method      : 'POST',
            data        : {lang , notify_id},
            headers     : {Authorization: token}
        }).then(response => {

            Notifications(lang , token , dispatch);

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

        })
    }
};

const Notifications = (lang , token , dispatch ) => {
    axios({
        url         : CONST.url + 'notifications',
        method      : 'POST',
        data        : {lang },
        headers     : {Authorization: token}
    }).then(response => {

        dispatch({type:'getNotifications', payload: response.data});

        // if(response.data.data.length === 0){
        //     Toast.show({
        //         text        : response.data.msg,
        //         type        : "danger",
        //         duration    : 3000,
        //         textStyle   : {
        //             color       : "white",
        //             fontFamily  : 'cairo',
        //             textAlign   : 'center'
        //         }
        //     });
        // }

    })
};
