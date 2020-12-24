import axios from 'axios';

const instance = axios.create(
    {
        baseURL:'https://react-burger-builder-f1561.firebaseio.com/'
    }
);

export default instance;