import axios from 'axios';
import { getEnviroments } from '../helpers';

const { VITE_API_BACKEND_URL } = getEnviroments();



const appApi = axios.create({
    baseURL : `${VITE_API_BACKEND_URL}/api`,
});

appApi.interceptors.request.use( config => {

    const token = localStorage.getItem('token');
    if ( token ) {
        config.headers!['gamera-token'] = token;
    }

    return config;
});

export default appApi;