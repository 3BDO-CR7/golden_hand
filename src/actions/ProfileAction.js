import axios from 'axios';
import CONST from '../consts'
import {Toast} from "native-base";
import {AsyncStorage} from "react-native";


export const profile = (token) => {
    return (dispatch) => {
        axios({
            method      : 'POST',
            url         : CONST.url + 'user-data',
            headers     : {Authorization: token}
        }).then(response => {
            const data = response.data.data;
            dispatch({type: 'profile_data', data})
        })
    }
}


export const updateProfile = (data) => {
    return (dispatch) => {
        axios({
            url: CONST.url + 'update-profile',
            method      : 'POST',
            headers     : {Authorization: data.token },
            data        : {
                name                : data.name,
                phone               : data.phone,
                city_id             : data.city_id,
                lat                 : data.lat,
                lng                 : data.lng,
                avatar              : data.avatar,
                address             : data.address,
                category_id         : data.category_id,
                provider_details    : data.provider_details,
                lang                : data.lang,
            }}).then(response => {

            if (response.data.key == 1) {

                data.props.navigation.navigate('profile');

                dispatch({type: 'update_profile', data:response.data.data});

            }

            Toast.show({
                text        : response.data.msg,
                type        : response.data.key == 1 ? "success" : "danger",
                duration    : 3000,
                textStyle       : {
                    color           : "white",
                    fontFamily      : 'cairo',
                    textAlign       : 'center'
                }
            });

        })
    }
}

export const logout = (data) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'logout',
            method      : 'POST',
            headers     : { Authorization: data.token },
        }).then(response => {
                AsyncStorage.multiRemove(['token', 'auth', 'profile'])
                dispatch({type: 'logout'})
            }
        )
    }
};

