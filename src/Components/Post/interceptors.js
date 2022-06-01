import axios from "axios";


const customAxios = axios.create();


const responseHandler = (response) => {
    if (response.status === 401) {
        return;
    }
};

const errorHandler = (error) => {
    return Promise.reject(error);
};

customAxios.interceptors.request.use(
    (request) => request,
    (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error));

export default customAxios;