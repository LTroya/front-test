import {HOLIDAY_API_KEY} from '../config/env';
import axios from 'axios';

export const fetch = (params) => {
    return axios.get('https://holidayapi.com/v1/holidays', {
        params: { ...params, key: HOLIDAY_API_KEY}
    }).catch(err => {
        alert('Error fetching holidays, please try again!');
    });
};
