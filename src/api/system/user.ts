import { http } from '../request'
interface paramsType {
    [propName: string]: any
}

export const getList = async (current?: number, size?: number, params?: paramsType) => {
    return http('/blade-user/list', {
        data: {
            ...params,
            current,
            size,
        }
    })
}
// export const getList = async (current?: number, size?: number, params?: paramsType) => {
//     return http('/admin/goods/list', {
//         data: {
//             ...params,
//             current,
//             size,
//         }
//     })
// }

export const remove = async (ids) => {
    return http('/blade-user/remove', {
        method: 'post',
        params: {
            ids: ids,
        }
    })
}

export const add = (row) => {
    return http('/blade-user/submit', {
        method: 'post',
        data: row
    })
}

export const update = (row) => {
    return http('/blade-user/update', {
        method: "post",
        data: row
    })
}
