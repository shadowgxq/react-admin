import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Image, Col, Row } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "@/pages/Login/index.less";
import { useMount } from "@/hooks/index";
import { getCaptcha, login } from "@/api/auth-provider";
import { useNavigate } from "react-router-dom";
const Login: React.FC = () => {
    const navigate = useNavigate();

    const [captcha, setCaptcha] = useState("");
    const [key, setKey] = useState("");

    const initCaptcha = () => {
        getCaptcha().then((res) => {
            setCaptcha(res.data.image);
            setKey(res.data.key);
        });
    };
    const onFinish = (values: any) => {
        login({
            account: values.username,
            password: values.password,
            code: values.captcha,
            key: key,
        }).then((res) => {
            navigate("/");
        });
    };
    const onFinishFailed = (errorInfo: any) => {};

    useMount(() => {
        initCaptcha();
    });
    return (
        <div className="login">
            <Form
                className="formbox"
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 8 }}
                initialValues={{
                    remember: true,
                    username: "admin",
                    password: "123456",
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <h1>登录 后台</h1>
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username!",
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Username"
                    />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item
                    name="captcha"
                    wrapperCol={{ offset: 8, span: 8 }}
                    rules={[
                        { required: true, message: "Place input your captcha" },
                    ]}
                >
                    <Row>
                        <Col span={12}>
                            <Input placeholder="captcha"></Input>
                        </Col>
                        <Col span={10} offset={2} style={{ cursor: "pointer" }}>
                            <Image
                                onClick={() => initCaptcha()}
                                width={"100%"}
                                height={35}
                                src={captcha}
                                preview={false}
                            />
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
export default Login;
