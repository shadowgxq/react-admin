export const localStoreageKey = "__auth-token-ml__";
export const baseUrl: string = process.env.NODE_ENV == 'development'
    // ? 'http://47.97.215.61:8081/'
    ? '/api'
    : '/'
export const _CONFIG_ = {
    clientId: 'saber', // 客户端id
    clientSecret: 'saber_secret', // 客户端密钥
    key: 'saber',//配置主键,目前用于存储
}