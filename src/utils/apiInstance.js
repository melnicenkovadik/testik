import axios from 'axios';

const apiInstance = () => axios.create({
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json',
    },
});

const getRequest = (url) => {
    return apiInstance().get(url, {withCredentials: false});
};

const postRequest = (url, body) => {
    return apiInstance().post(url, body);
};

const deleteRequest = (url) => {
    return apiInstance().delete(`${url}`);
};

const updateRequest = (url, body) => {
    return apiInstance().post(url, body);
};

export default {getRequest, postRequest, deleteRequest, updateRequest};
