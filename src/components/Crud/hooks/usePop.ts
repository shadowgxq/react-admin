import { useState, useEffect } from "react"

export const usePop = () => {
    //add pop state
    const [addVisible, setAddVisible] = useState<boolean>(false);
    //edit pop state
    const [editVisible, setEditVisible] = useState<boolean>(false);
    return {
        addVisible,
        setAddVisible,
        editVisible,
        setEditVisible
    }
}
