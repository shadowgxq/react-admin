const Mock = require('mockjs')

//test请求
Mock.mock('/mock/test', 'get', () => {
    return Mock.mock(
        {
            'status': '200',
            'data|1-10': [
                {
                    'name': "@word",
                    "num|1": 100,
                    'list|1-3': ['@string(1,10)']
                }
            ]
        }

    )

})
//get请求
Mock.mock('/mock/user', 'get', (options) => {
    const ret = Mock.mock({
        'user|2': [{ username: '@cname' }]
    })
    return {
        status: 200,
        data: ret
    }
})

//get请求：模拟分页数据
Mock.mock('/mock/list', 'get', (options) => {
    //接受参数：是JSON格式，需要转换成对象
    const page = JSON.parse(options.body).page
    const ret = Mock.mock({
        'list|20': [{ 'id|+1': 1, name: '@cname' }]
    })

    if (page > 3) {
        return {
            status: 200,
            data: []
        }
    }
    return {
        status: 200,
        data: ret
    }
})

//post请求，模拟注册
Mock.mock('/mock/add', 'post', (options) => {
    return {
        status: 200,
        data: JSON.parse(options.body).data
    }
})