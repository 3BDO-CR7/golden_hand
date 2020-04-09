import axios from "axios";
import CONST from "../consts";
import {AsyncStorage} from "react-native";
import {Toast} from "native-base";


export const register = (data, props, lang) => {
    return (dispatch) => {

        AsyncStorage.getItem('deviceID').then(device_id => {
            axios({
                url: CONST.url + 'register',
                method: 'POST',
                data: {
                    type			    : data.chooseUser,
                    name			    : data.username,
                    phone			    : data.phone,
                    city_id		        : data.country,
                    category_id		    : data.category_id,
                    lat			        : data.latitude,
                    lng			        : data.longitude,
                    address			    : data.city_name,
                    identity_image		: data.IDbase64,
                    car_image			: data.Carbase64,
                    licence_image	    : data.Licensebase64,
                    password		    : data.password,
                    device_id,
                    lang
                }
            }).then(response => {
                dispatch({type: 'register', payload: response.data});
                if (response.data.key === 1){
                    props.navigation.navigate('ActivationCode', {
                        code			: response.data.data.code,
                        user_id			: response.data.data.id,
                        phone			: data.phone,
                        password		: data.password,
                        deviceId		: device_id
                    });
                }

                Toast.show({
                    text        	: response.data.msg,
                    type			: response.data.key === 1 ? "success" : "danger",
                    duration    	: 3000,
                    textStyle   	: {
                        color       	: "white",
                        fontFamily  	: 'cairo',
                        textAlign   	: 'center'
                    }
                });

            })
        })

    }
};