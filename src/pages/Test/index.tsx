//redux-toolkit test
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "@/store/features/counterSlice";
import { getMovieData } from "@/store/features/movieSlice";
import { useEffect } from "react";
const Test = () => {
    //@ts-ignore
    const { value } = useSelector((store) => store.counter);
    //@ts-ignore
    const { list } = useSelector((store) => store.movie);
    const dispatch = useDispatch();
    return (
        <div className="test">
            <p>{value}</p>
            <button onClick={() => dispatch(increment())}>+</button>
            <button
                onClick={() => {
                    dispatch(decrement());
                }}
            >
                减
            </button>
            <button
                onClick={() => {
                    //@ts-ignore
                    dispatch(getMovieData());
                }}
            >
                获取数据
            </button>
            <ul>
                {list.map((item) => {
                    return <li key={item.tvId}> {item.name}</li>;
                })}
            </ul>
        </div>
    );
};
export default Test;
