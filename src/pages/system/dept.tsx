import Crud from "@/components/Crud/index";
import { getList, remove, add, update } from "@/api/system/user";
import type { PaginationProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useAsync } from "@/hooks/useAsync";
import { message, Tag } from "antd";
import { useEffect, useState } from "react";
import React from "react";
const Dept = () => {
    let ChildRef = React.createRef<any>();
    const columns: columnsType[] = [
        {
            title: "Id",
            dataIndex: "id",
        },
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
    ];
    const { run, ...result } = useAsync();
    const [data, setData] = useState([]);
    const [config, setConfig] = useState<any>();
    const [page, setPage] = useState({
        pageSize: 10,
        current: 1,
        total: 100,
        showSizeChanger: true,
        showQuickJumper: false,
        onChange: (current, pageSize) => {
            setPage({ ...page, current: current, pageSize: pageSize });
        },
    });

    useEffect(() => {
        setConfig({ ...config, loading: result.isLoading });
    }, [result.isLoading]);

    const onLaod = (page, params = {}) => {
        run(getList(page.current, page.pageSize, params))
            .then((res) => {
                const data = res.data;
                setData(data.records);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    //Form callback
    const successCallBack = (row, type) => {
        if (type == "ADD") {
            handleAddForm(row);
        } else if (type == "EDIT") {
            handleEditFrom(row);
        }
    };

    const handleAddForm = (row) => {
        run(add(row))
            .then((res) => {
                if (res.success) {
                    handleReset();
                    message.info("新增成功");
                }
            })
            .catch((err) => {});
    };

    const handleEditFrom = (row) => {
        run(update(row))
            .then((res) => {
                if (res.success) {
                    handleReset();
                    message.info("更新成功");
                }
            })
            .catch((err) => {});
    };
    const handleDelete = (row) => {
        run(remove([row])).then((res) => {
            if (res.success) {
                message.success("删除成功");
                handleReset();
            }
        });
    };

    const handleReset = (payload?: any) => {
        setPage({
            pageSize: 10,
            current: 1,
            total: 0,
        } as any);
        onLaod(page, payload);
    };

    return (
        <div>
            <Crud
                successCallBack={successCallBack}
                handleReset={handleReset}
                source={data}
                columns={columns}
                onLaod={onLaod}
                config={config}
                page={page}
                handleDelete={handleDelete}
            ></Crud>
        </div>
    );
};
export default Dept;
