import { Button, Col, Form, Input, Row } from "antd";
import { deleteParmas } from "@/utils/util";
import {
    SearchOutlined,
    LoadingOutlined,
    ClearOutlined,
} from "@ant-design/icons";

import React, { useState } from "react";

interface SearchProps {
    searchData: columnsType[];
    //TODO
    setSearchVal?: any;
    searchVal?: any;
    [prop: string]: any;
}

const Search = ({ searchData, handleReset }: SearchProps) => {
    const [form] = Form.useForm();
    const onFinish = (values: any) => {
        handleReset(deleteParmas(values));
    };
    const onReset = () => {
        form.resetFields();
        handleReset();
    };
    return (
        <div>
            <Form onFinish={onFinish} form={form}>
                <Row gutter={16}>
                    {searchData
                        .filter((item) => {
                            return item.search == true;
                        })
                        .map((element, index) => {
                            return (
                                <Col span={6} key={element.dataIndex}>
                                    <Form.Item
                                        labelCol={{
                                            span: element?.labelWidth || 6,
                                        }}
                                        wrapperCol={{
                                            offset: 1,
                                        }}
                                        label={element.title}
                                        key={element.dataIndex}
                                        name={element.dataIndex}
                                    >
                                        <Input autoComplete="off" allowClear />
                                    </Form.Item>
                                </Col>
                            );
                        })}
                    <Col span={6} offset={1}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<SearchOutlined />}
                        >
                            搜索
                        </Button>
                        <Button
                            style={{ marginLeft: 20 }}
                            htmlType="button"
                            onClick={onReset}
                        >
                            重置
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};
export default Search;
