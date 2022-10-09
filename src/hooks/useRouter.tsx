import React, { useState, useEffect, lazy } from "react";
import { LaptopOutlined } from "@ant-design/icons";
import { getRouter } from "@/api/auth-provider";
import { Link, Router } from "react-router-dom";
import { Route } from "react-router";
import { lazyLoad } from "@/utils/index";

import Operationcount from "@/pages/myreport/operationcount/index";

export const useRouter = () => {
    const [Menu, setMenu] = useState<any>();
    const [content, setContent] = useState<any>();
    const [routerList, setRouterList] = useState<any>([]);
    const converRouter = (target: Array<any>) => {
        return target.map((res) => {
            return {
                key: res.id,
                icon: React.createElement(LaptopOutlined),
                label: res.children ? (
                    res.name
                ) : (
                    <Link to={res.path.slice(1)}>{res.name}</Link>
                ),
                children: res.children ? converRouter(res.children) : "",
            };
        });
    };

    const converContent = (target: Array<any>) => {
        return target?.map((item) => {
            if (!item.children) {
                return (
                    <Route
                        path={item.path.slice(1)}
                        element={lazyLoad(item.path)}
                    ></Route>
                );
            } else {
                return converContent(item.children);
            }
        });
    };

    useEffect(() => {
        getRouter()
            .then((res) => {
                setMenu(converRouter(res.data));
                setContent(converContent(res.data));
                setRouterList(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return {
        Menu,
        content,
        routerList,
    };
};
