import { CrudType, ConfigType } from "./crudType";
import { useMount } from "@/hooks/index";
import GSearch from "./Search";
import GForm from "./Form";
import { useState, useImperativeHandle, useEffect, useMemo } from "react";
import { Button, message, Modal, Popconfirm, Table } from "antd";
import { usePop } from "./hooks/usePop";
import React from "react";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const Crud = ({
    source = [],
    columns,
    config,
    onLaod,
    successCallBack,
    handleReset,
    page,
    handleDelete,
    ...props
}: CrudType) => {
    //custom hooks
    const [edtiSource, setEdtiSource] = useState<any>({});
    //pop state
    const { addVisible, setAddVisible, editVisible, setEditVisible } = usePop();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    //export Data

    //Default Value
    const defaultColumns: columnsType[] = [
        {
            title: "操作",
            valueType: "option",
            dataIndex: "id",
            fixed: "right",
            render: (_, record: { key?: React.Key; id?: React.Key }) => [
                <Button
                    style={{ marginRight: "10px" }}
                    type="link"
                    onClick={() => handleEdit(record)}
                    key="edit"
                >
                    编辑
                </Button>,
                <Popconfirm
                    title="Sure to delete?"
                    onConfirm={() => handleDeleteMiddleware(record.id)}
                    key="delete"
                >
                    <a>删除</a>
                </Popconfirm>,
            ],
        },
    ];

    const defaultConfig: Partial<ConfigType> = {
        Searchable: true,
        Addable: true,
        Editable: true,
        loading: false,
    };
    //Dom ref
    let ChildRef = React.createRef<any>();

    //compose data
    const [crudConfig, setCrudConfig] = useState<ConfigType>({
        ...defaultConfig,
        ...config,
    } as ConfigType);

    //operater methods
    const handleEdit = (_) => {
        setEdtiSource(_);
        setEditVisible(true);
    };

    const closeAllPop = () => {
        setAddVisible(false);
        setEditVisible(false);
    };
    //intercept
    const successCallBackForm = (row, type) => {
        closeAllPop();
        successCallBack && successCallBack(row, type);
    };
    useEffect(() => {
        onLaod(page);
    }, [page]);

    //Add table column
    const handleAdd = () => {
        setAddVisible(true);
    };
    //delete
    const handleDeleteMiddleware = (payload: any) => {
        if (selectedRowKeys.length == 0 || !payload) {
            message.error("请至少选择一条数据");
        }
        handleDelete(payload);
    };
    //select data
    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys) => {
            setSelectedRowKeys(newSelectedRowKeys);
        },
    };

    return (
        <>
            <div className="crud">
                {/* Search Model */}
                {crudConfig.Searchable && (
                    <GSearch
                        columns={columns}
                        handleReset={handleReset}
                    ></GSearch>
                )}
                {/* menu */}
                <div className="menuLeft" style={{ marginBottom: 16 }}>
                    <Button
                        icon={<PlusOutlined />}
                        type="primary"
                        onClick={handleAdd}
                    >
                        新增
                    </Button>
                    <Popconfirm
                        title={"是否删除选择数据"}
                        onConfirm={() =>
                            handleDeleteMiddleware(selectedRowKeys)
                        }
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            icon={<DeleteOutlined />}
                            style={{ marginLeft: 10 }}
                            danger
                        >
                            删除
                        </Button>
                    </Popconfirm>
                </div>
                {/* Table */}
                <Table
                    loading={config?.loading}
                    rowSelection={rowSelection}
                    rowKey={"id"}
                    dataSource={source}
                    pagination={page}
                    //TODO: custom option
                    columns={[...columns, ...defaultColumns]?.filter(
                        (column) => !column.hide
                    )}
                    scroll={{ x: "1500px", y: "550px" }}
                />

                {/* Add Pop */}
                {crudConfig.Addable && (
                    <Modal
                        title="新增"
                        centered
                        width="70%"
                        visible={addVisible}
                        onOk={() => ChildRef.current.onFinish()}
                        onCancel={() => setAddVisible(false)}
                        okText="确定"
                        cancelText="取消"
                        // afterClose={afterClose}
                    >
                        <GForm
                            type="ADD"
                            onRef={ChildRef}
                            columns={columns}
                            successCallBack={successCallBackForm}
                        ></GForm>
                    </Modal>
                )}

                {/* Edit Pop */}
                {crudConfig.Editable && (
                    <Modal
                        title="编辑"
                        centered
                        width="70%"
                        visible={editVisible}
                        onOk={() => ChildRef.current.onFinish()}
                        onCancel={() => setEditVisible(false)}
                        okText="确定"
                        cancelText="取消"
                        // afterClose={afterClose}
                    >
                        <GForm
                            type="EDIT"
                            columns={columns}
                            onRef={ChildRef}
                            edtiSource={edtiSource}
                            successCallBack={successCallBackForm}
                        ></GForm>
                    </Modal>
                )}
            </div>
        </>
    );
};
export default Crud;
