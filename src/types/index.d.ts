declare interface PersonInterface {
    name: string;

}
type ruleType = {
    required: boolean;
    message: string;
}

declare type columnsType = {
    title: string;
    dataIndex: string;
    render?: (...items: any[]) => any;
    search?: boolean;
    labelWidth?: number;
    hide?: boolean;
    addDisabled?: boolean;
    rules?: ruleType[];
    [prop: string]: any;
};