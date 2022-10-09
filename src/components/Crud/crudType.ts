export interface CrudType {
    //Init Data
    onLaod: (page: PageType) => void;
    //Pop  Success callBack
    successCallBack?: (row: any, type: string) => void;
    handleDelete?: any,
    config?: ConfigType;
    handleReset?: () => void;
    //data source
    source?: any;
    //Column Data
    page: any;
    columns: Array<columnsType>;
}

export type ConfigType = {
    //Search state
    Searchable?: boolean;
    //Add Pop State
    Addable?: boolean;
    Editable?: boolean;
    // http loading state
    loading?: boolean;
    // rowSelection?: any;
}

type PageType = {
    pageSize: number,
    current: number,
    total: number,
    showSizeChanger?: boolean,
    params?: any,
    [prop: string]: any,
}
