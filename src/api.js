import axios from 'axios';
import redirect from './redirect';
import Cookies from "js-cookie";
import Router from "next/router";

const isServer = () => typeof window === "undefined";
const getAxiosInstance = (context) => {
    let api_key;
    if (context) {
        const { req } = context;
        if (isServer() && typeof req !== undefined) {
            api_key = req.cookies[process.env.API_COOKIE_NAME];
        }
    }
    if (!isServer()) {
        api_key = Cookies.get(process.env.API_COOKIE_NAME);
    }
    let instance;

    if (api_key) {
        instance = axios.create({
            headers: {
                'Authorization': `Bearer ${api_key}`
            }
        });
    } else {
        instance = axios;
    }

    return instance;
};

const _request = async (context, method, url, ...args) => {
    let res;
    try {
        res = await getAxiosInstance(context)[method](`${process.env.API_ADDRESS}${url}`, ...args);
    }
    catch (err) {
        if (err.response?.status === 401) {
            let cb = "/"
            if (context && context.req) {
                cb = context.req.url;
            }
            redirect(context, `/signin?cb=${encodeURIComponent(cb)}`)
        }
        return;
    }
    return res;
};
const signIn = async (context, method, url, ...args) => {
    let res;
    try {
        res = await getAxiosInstance(context)[method](`${process.env.API_ADDRESS}${url}`, ...args);
        if (res?.statusText === "OK") {
            Cookies.set(process.env.API_COOKIE_NAME, res.data.access_token);
        }
    }
    catch (err) {
        if (err.response?.status === 401) {
            redirect(context, "/signin")
        }
        return Promise.reject(err);
    }
    return res;
};
const signOut = () => {
    Cookies.remove(process.env.API_COOKIE_NAME)
    Router.push("/signin")
}
const getUser = async (context, method, url, ...args) => {
    let res;
    try {
        res = await getAxiosInstance(context)[method](`${process.env.API_ADDRESS}${url}`, ...args);
    }
    catch (err) {
        return;
    }
    return res;
};
const api = {
    get: (context, url, ...args) => _request(context, 'get', url, ...args),
    delete: (context, url, ...args) => _request(context, 'delete', url, ...args),
    head: (context, url, ...args) => _request(context, 'head', url, ...args),
    post: (context, url, ...args) => _request(context, 'post', url, ...args),
    put: (context, url, ...args) => _request(context, 'put', url, ...args),
    patch: (context, url, ...args) => _request(context, 'patch', url, ...args),
    signIn: (context, url, ...args) => signIn(context, 'post', url, ...args),
    signOut: () => signOut(),
    getUser: (context, url, ...args) => getUser(context, 'get', url, ...args),
};

export default api;