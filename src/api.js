import axios from 'axios';
const getAxiosInstance = (session) => {
    let instance;

    if (session.api_key) {
        instance = axios.create({
            headers: {
                'Authorization': `Bearer ${session.api_key}`
            }
        });
    } else {
        instance = axios;
    }

    return instance;
};

const _request = async (session, method, url, ...args) => {
    let res;
    try {
        res = await getAxiosInstance(session)[method](`${process.env.API_ADDRESS}${url}`, ...args);
    }
    catch (err) {
        console.log(err)
        return;
    }
    return res;
};

const api = {
    get: (session, url, ...args) => _request(session, 'get', url, ...args),
    delete: (session, url, ...args) => _request(session, 'delete', url, ...args),
    head: (session, url, ...args) => _request(session, 'head', url, ...args),
    post: (session, url, ...args) => _request(session, 'post', url, ...args),
    put: (session, url, ...args) => _request(session, 'put', url, ...args),
    patch: (session, url, ...args) => _request(session, 'patch', url, ...args)
};

export default api;