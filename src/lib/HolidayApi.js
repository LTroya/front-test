import {HOLIDAY_API_KEY} from '../config/env';
import axios from 'axios';

export const holidayApi = {
    fetch: (params) => {
        return axios.get('https://holidayapi.com/v1/holidays', {
            params: {...params, key: HOLIDAY_API_KEY},
        });
    }
};
