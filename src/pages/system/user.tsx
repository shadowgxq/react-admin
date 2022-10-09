import React, { useEffect, useState } from "react";
import { getList, remove, add, update } from "@/api/system/user";
import { Button, Table, Tag, Popconfirm, message, Modal } from "antd";
import Search from "@/components/Search";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import RenderForm from "@/components/RenderForm";
import { useAsync } from "@/hooks/useAsync";
const User: React.FC = () => {
    const columns: columnsType[] = [
        {
            title: "登录账号",
            dataIndex: "account",
            search: true,
            labelWidth: 6,
            hide: true,
            rules: [{ required: true, message: "Please input your username!" }],
        },
        {
            title: "所属租户",
            dataIndex: "tenantId",
            addDisabled: false,
            search: true,
        },
        {
            title: "用户昵称",
            dataIndex: "name",
            search: true,
        },
        {
            title: "用户姓名",
            dataIndex: "realName",
            search: true,
        },
        {
            title: "所属角色",
            dataIndex: "roleId",
            search: true,
        },
        {
            title: "所属部门",
            dataIndex: "deptId",
        },
        {
            title: "手机号码",
            dataIndex: "phone",
            render: (text, record) => {
                return (
                    <>
                        <Tag color="blue">{text || "-"}</Tag>
                    </>
                );
            },
        },
        {
            title: "操作",
            valueType: "option",
            dataIndex: "id",
            fixed: "right",
            render: (_, record: { key: React.Key }) => [
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
                    onConfirm={() => handleDeleteLine(record)}
                    key="delete"
                >
                    <a>删除</a>
                </Popconfirm>,
            ],
        },
    ];
    const { run, ...result } = useAsync();

    let ChildRef = React.createRef<any>();
    //extra data that render at add search option
    const [data, setData] = useState([]);
    //current table column data
    const [resource, setResource] = useState<any>({});
    //add pop state
    const [AddVisible, setAddVisible] = useState<boolean>(false);
    //edit pop state
    const [popVisible, setPopVisible] = useState<boolean>(false);
    //default openKeys
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [page, setPage] = useState({
        pageSize: 10,
        currentPage: 1,
        total: 0,
    });

    const handleEdit = (row) => {
        setResource(row);
        setPopVisible(true);
    };

    //handle searchData
    const handleReset = (payload?: any) => {
        setPage({ pageSize: 10, currentPage: 1, total: 0 });
        onLaod(page, payload);
    };

    //select data
    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys) => {
            setSelectedRowKeys(newSelectedRowKeys);
        },
    };

    //init data
    const onLaod = (page, params = {}) => {
        run(getList(page.currentPage, page.pageSize, params))
            .then((res) => {
                const data = res.data;
                setPage({ ...page, total: data.total });
                setData(data.records);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        onLaod(page);
    }, []);

    const handleAdd = () => {
        setAddVisible(true);
    };
    const closeAllPop = () => {
        setAddVisible(false);
        setPopVisible(false);
    };
    //succes cb
    const successCallBack = (row, type) => {
        if (type == "ADD") {
            handleAddForm(row);
        } else if (type == "EDIT") {
            handleEditFrom(row);
        }
    };
    const handleEditFrom = (row) => {
        // setLoading(true);
        run(update(row))
            .then((res) => {
                if (res.success) {
                    handleReset();
                    message.info("更新成功");
                    closeAllPop();
                }
            })
            .catch((err) => {});
    };

    //子组件回调
    const handleAddForm = (row) => {
        run(add(row))
            .then((res) => {
                if (res.success) {
                    handleReset();
                    message.info("新增成功");
                    closeAllPop();
                }
                handleReset();
            })
            .catch((err) => {});
    };

    //调子组件的onFinish 校验
    const handleOk = () => {
        ChildRef.current.onFinish();
    };
    //model close
    const afterClose = () => {};

    //delete table column
    const handleDeleteLine = (row) => {
        run(remove([])).then((res) => {
            if (res.success) {
                message.success("删除成功");
                handleReset();
            }
        });
    };

    const handleDelete = () => {
        if (selectedRowKeys.length == 0) {
            message.error("请至少选择一条数据");
        }
        run(remove([])).then((res) => {
            if (res.success) {
                message.success("删除成功");
                handleReset();
            }
        });
    };

    return (
        <div>
            <Search handleReset={handleReset} searchData={columns}></Search>
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
                    onConfirm={handleDelete}
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
            <Table
                loading={result.isLoading}
                rowSelection={rowSelection}
                rowKey={"id"}
                dataSource={data}
                columns={columns.filter((column) => !column.hide)}
                scroll={{ x: "1500px" }}
            />
            {/* addPop 弹窗新增*/}
            <Modal
                title="新增"
                centered
                width="70%"
                visible={AddVisible}
                onOk={handleOk}
                onCancel={() => setAddVisible(false)}
                okText="确定"
                cancelText="取消"
                afterClose={afterClose}
            >
                {/* onRef用于回调校验 */}
                <RenderForm
                    type="ADD"
                    onRef={ChildRef}
                    source={columns}
                    successCallBack={successCallBack}
                ></RenderForm>
            </Modal>
            {/* addPop 弹窗编辑*/}
            <Modal
                title="编辑"
                centered
                width="70%"
                visible={popVisible}
                onOk={handleOk}
                onCancel={() => setPopVisible(false)}
                okText="确定"
                cancelText="取消"
                afterClose={afterClose}
            >
                {/* onRef用于回调校验 */}
                <RenderForm
                    type="EDIT"
                    resource={resource}
                    onRef={ChildRef}
                    source={columns}
                    successCallBack={successCallBack}
                ></RenderForm>
            </Modal>
        </div>
    );
};
export default User;
