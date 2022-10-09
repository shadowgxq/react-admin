import { useState } from 'react'

interface State<T> {
    data: T | null;
    error: Error | null;
    stat: 'idle' | 'loading' | 'success' | 'error'
}

const defaultState: State<null> = {
    data: null,
    error: null,
    stat: 'idle'
}

export const useAsync = <T>(initialState?: State<T>) => {
    const [state, setState] = useState<State<T>>({
        ...defaultState,
        ...initialState
    })
    const setData = (data: T) => {
        setState({
            data,
            error: null,
            stat: 'success'
        })
    }

    const setError = (error: Error) => {
        setState({
            data: null,
            error,
            stat: 'error'
        })
    }

    const run = (promise: Promise<T>): any => {
        if (!promise || !promise.then) {
            throw new Error("请传入promise函数");
        }
        setState({ ...state, stat: 'loading' })
        return promise.then(res => {
            setData(res)
            return Promise.resolve(res)
        }).catch((error: Error) => {
            setError(error)
            return Promise.reject(error)
        })
    }

    return {
        isIdle: state.stat === "idle",
        isLoading: state.stat === "loading",
        isError: state.stat === "error",
        isSuccess: state.stat === "success",
        run,
        setData,
        setError,
        ...state,
    }
}