import { Button, Col, Form, Input, Row } from "antd";
import { deleteParmas } from "@/utils/util";
import { useImperativeHandle, useEffect, useState } from "react";
//white list of valueType
const whiteList = ["option"];
const RenderForm = ({ columns, rowSpan = 12, successCallBack, ...props }) => {
    const [form] = Form.useForm();

    const onFinish = async () => {
        try {
            const values = await form.validateFields();
            successCallBack(
                deleteParmas({ ...props.edtiSource, ...values }),
                props.type || "ADD"
            );
        } catch (errorInfo) {
            console.log("Failed:", errorInfo);
        }
    };

    const onReset = () => {
        form.resetFields();
    };

    //REMEMBER;
    //life cycle
    useEffect(() => {
        return () => {
            onReset();
        };
    }, [props.type]);

    useEffect(() => {
        form.setFieldsValue(props.edtiSource);
    }, [props.edtiSource]);

    useImperativeHandle(props.onRef, () => {
        return {
            onFinish,
            onReset,
        };
    });

    return (
        <>
            <Form form={form}>
                <Row gutter={16}>
                    {columns
                        .filter((item) => {
                            return (
                                item.addDisabled !== false &&
                                !whiteList.includes(item.valueType)
                            );
                        })
                        .map((element, index) => {
                            return (
                                <Col
                                    span={rowSpan || 12}
                                    key={element.dataIndex}
                                >
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
                                        rules={element.rules}
                                    >
                                        <Input autoComplete="off" allowClear />
                                    </Form.Item>
                                </Col>
                            );
                        })}
                </Row>
            </Form>
        </>
    );
};
export default RenderForm;
