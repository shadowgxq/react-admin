import { Breadcrumb, Layout, Menu, MenuProps, Spin } from "antd";
import { useRouter } from "@/hooks/useRouter";
import { useBreadcrumb } from "./useBreadcrumb";
import { useOpenKeys } from "./useOpenKeys";
import React, { Suspense, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import Charts from "@/pages/Charts/index";
import ErrorPage from "@/pages/ErrorPage/errorPage";
import "./index.less";

const { Header, Content, Sider } = Layout;

const Home: React.FC = () => {
    const { Menu: MenuList, content, routerList } = useRouter();
    const { defaultOpenKeys, selectedKeys, setDefaultOpenKeys, keyList } =
        useOpenKeys(routerList);
    const { breadcrumbList, menuClick } = useBreadcrumb(routerList, keyList);
    //when change selected
    const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
        setDefaultOpenKeys(keys);
    };
    return (
        <div className="home">
            <Layout style={{ height: "100vh" }}>
                <Header className="header"></Header>
                <Layout className="">
                    <Sider
                        width={200}
                        className="site-layout-background MenuSider"
                    >
                        <Menu
                            openKeys={defaultOpenKeys}
                            onOpenChange={onOpenChange}
                            selectedKeys={selectedKeys}
                            mode="inline"
                            style={{
                                height: "100%",
                                borderRight: 0,
                            }}
                            onClick={menuClick}
                            items={MenuList}
                        />
                    </Sider>
                    <Layout
                        style={{
                            padding: "0 24px 24px",
                        }}
                    >
                        <Breadcrumb
                            style={{
                                margin: "16px 0",
                            }}
                        >
                            {breadcrumbList.map((item) => (
                                <Breadcrumb.Item key={item}>
                                    {item}
                                </Breadcrumb.Item>
                            ))}
                        </Breadcrumb>
                        <Suspense fallback={<Spin />}>
                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >
                                <Routes>
                                    {content}
                                    <Route
                                        path="/home"
                                        element={<Charts />}
                                    ></Route>
                                    <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
                                </Routes>
                            </Content>
                        </Suspense>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    );
};

export default Home;
