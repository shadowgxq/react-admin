//DEMO of react mockjs
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Stringify from '@/components/common/Stringify'
function Test2() {
    const [page, setPage] = useState(0)
    const [renderData, setRenderData] = useState([])
    useEffect(() => {
        //get请求
        axios.get('/mock/user').then(res => {
            // console.log(res.data)
        })
        //get test请求
        axios.get('/mock/test').then(res => {
            setRenderData(res.data.data)
        })
        //post请求，模拟注册或登陆
        axios.post('/mock/add', {
            data: {
                username: 'admin',
                password: 123
            }
        }).then(res => {
            // console.log(res.data)
        })
    }, [])
    return (
        <div className="App">
            <button onClick={() => setPage(page + 1)}>请求分页</button>
            <Stringify payload={renderData}></Stringify>
        </div>
    );
}

export default Test2;