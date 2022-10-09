import { localStoreageKey, baseUrl } from '../consts/index'
import { http } from './request'
export interface IAuthParam {
    account: string;
    password: string;
    key?: string;
    code?: string;

}

const handleUserResponse = (user) => {
    localStorage.setItem(localStoreageKey, user.accessToken);
    return user;
};

export const getCaptcha = async () => {
    return http('/blade-auth/captcha')
}

export const login = async (data: IAuthParam) => {
    return http(`/blade-auth/token`, {
        method: "POST",
        headers: {
            'Captcha-Key': data.key!,
            'Captcha-Code': data.code!,
        },
        params: {
            grantType: 'captcha',
            tenantId: '000000',
            type: 'account',
            ...data
        }
    }).then(async (res) => {
        if (res && res.success) {
            return handleUserResponse(await res.data);
        } else {
            return Promise.reject(data);
        }
    })
}

export const register = async (data: IAuthParam) => {
    return http(`/login`, {
        method: "POST",
        data
    }).then(async (res) => {
        if (res && res.ok) {
            // alert('注册成功')
            return handleUserResponse(await res.json());
        } else {
            return Promise.reject(data);
        }
    });
}

export const logout = async () => {
    localStorage.removeItem(localStoreageKey);
}

export const getRouter = () => {
    return http('/blade-system/menu/routes')
}
