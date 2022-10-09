import { useEffect, useState } from "react";
/**
 * 
 * @param routerList 
 * @param keyList BreadcrumbListID
 * @returns 
 */
export const useBreadcrumb = (routerList, keyList) => {
    //Breadcrumb
    const [breadcrumbList, setBreadcrumbList] = useState([]);

    //Emit Callback
    const menuClick = ({ item, key, keyPath, domEvent }) => {
        setBreadcrumbById(keyPath);
    };

    useEffect(() => {
        setBreadcrumbById(keyList  as any)
    }, [routerList, keyList])

    //Set Breadcrumb List
    const setBreadcrumbById = (payload: Array<string | number>) => {
        let currentIndex: number = payload.length - 1;
        let textList: Array<string> = [];
        function getItem(list, currentIndex) {
            list.forEach((element) => {
                if (element.id === payload[currentIndex]) {
                    textList.push(element.name);
                    if (element.children) {
                        currentIndex--;
                        getItem(element.children, currentIndex);
                    }
                }
            });
            return textList;
        }
        setBreadcrumbList(getItem(routerList, currentIndex) as any);
    };

    return {
        menuClick,
        breadcrumbList,
        setBreadcrumbById
    }
}