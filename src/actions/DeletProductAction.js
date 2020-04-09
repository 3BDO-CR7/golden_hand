import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";

export const deletProduct = ( lang , product_id, token, props ) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'products/delete',
            method      : 'POST',
            headers     : { Authorization: token },
            data        : { lang , product_id }
        }).then(response => {

            dispatch({type: 'deletProduct', payload : response.data});

            if (response.data.key === 1){
                props.navigation.navigate('drawerNavigator');
            }

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
