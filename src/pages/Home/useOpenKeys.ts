import { useState, useEffect } from 'react'
export const useOpenKeys = (payload) => {
    const [defaultOpenKeys, setDefaultOpenKeys] = useState<Array<string>>([])
    const [selectedKeys, setSelectedKeys] = useState<Array<string>>([])
    const [keyList, setKeyList] = useState<Array<string>>([])
    //解析URL--非通用(TODO)
    let pathName = window.location.pathname
    const getData = () => {
        payload.forEach(Element => {
            if (pathName.indexOf(Element.path) != -1) {
                Element.children.forEach(child => {
                    if (child.path == pathName) {
                        setDefaultOpenKeys([child.parentId])
                        setSelectedKeys([child.id])
                        setKeyList([child.id, child.parentId,])
                    }
                })
            }
        });
    }

    useEffect(() => {
        getData()
    }, [pathName, payload])
    return {
        defaultOpenKeys,
        selectedKeys,
        setDefaultOpenKeys,
        keyList
    }
}