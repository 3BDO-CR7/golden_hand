import axios from "axios";
import CONST from "../consts";
import {AsyncStorage} from 'react-native';

export const offers = (lang, token) => {
	return (dispatch) => {
		AsyncStorage.getItem('deviceID').then(device_id => {
			axios({
				url: CONST.url + 'offers',
				method: 'POST',
				headers: token != null ? {Authorization: token} : null,
				data: {lang, device_id},
			}).then(response => {
				dispatch({type: 'offers', payload: response.data})
			})
		});

	}
};
