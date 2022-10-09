import qs from "qs";
import { useAuth } from "../context/auth-context";
import { baseUrl, _CONFIG_ } from '../consts/index'
import { Base64 } from "js-base64";
import { getToken } from "../utils/util";
import { message } from 'antd'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

const handleRemove = (row) => {
    let str = "";
    for (let i in row) {
        str += `${i}=${row[i]}`;
    }
    return str;
};

interface IConfig extends RequestInit {
    data?: object;
    token?: string;
    [propname: string]: any
}

export const http = async (
    url: string,
    { data, token, headers, ...customConfig }: IConfig = {}
) => {
    //TOOD Loading
    const config = {
        method: "GET",
        headers: {
            Authorization: `Basic ${Base64.encode(
                `${_CONFIG_.clientId}:${_CONFIG_.clientSecret}`
            )}`,
            "Blade-Auth": "bearer " + getToken(),
            "Content-Type": data ? "application/json" : "",
            ...headers
        },
        ...customConfig,
    };

    if (customConfig.params) {
        url = `${url}?${qs.stringify(customConfig.params)}`;
    }

    if (config.method.toUpperCase() === "GET") {
        url = `${url}?${qs.stringify(data)}`;
    }
    else if (customConfig.params) {
        // url = `${url}?${handleRemove(customConfig.params)}`;
    }
    else {
        config.body = JSON.stringify(data || {});
    }

    return window.fetch(`${baseUrl}${url}`, config).then(async (res) => {
        const dataRes = await res.json();
        //TOOD Loading
        if (res.ok) {
            if (dataRes.code === 401) {
                message.error(dataRes.msg);
                history.push('/login')
                window.location.reload()
                return Promise.reject({ message: "请重新登录" });
            }
            if (dataRes.code !== 200) {
                message.error(dataRes.msg);
                return Promise.reject({ message: dataRes.msg });
            }
            return dataRes;
        } else {
            //错误处理
            message.error(dataRes.msg);
            return Promise.reject(dataRes);
        }
    });
};

export const useHttp = () => {
    const { user } = useAuth();
    return (...[url, config]: Parameters<typeof http>) =>
        http(url, { ...config, token: user?.token });
};