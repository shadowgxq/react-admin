import React, { FC, Suspense } from "react";
import "antd";
import Home from "./pages/Home/home";
import Login from "./pages/Login/Login";
import ErrorPage from "./pages/ErrorPage/errorPage";
import "./App.less";
import { Navigate, Route, Routes, Outlet } from "react-router";
import Test from "./pages/Test";
import Test2 from "./pages/Test/index2";
const App: FC = () => {
    const DefaultVal = {};
    const Context = React.createContext(DefaultVal);
    return (
        <div className="App">
            <Context.Provider value={DefaultVal}>
                <Routes>
                    <Route path="/*" element={<Home></Home>}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/test" element={<Test />}></Route>
                    <Route path="/test2" element={<Test2 />}></Route>
                    <Route path="*" element={<ErrorPage />}></Route>
                </Routes>
            </Context.Provider>
        </div>
    );
};

export default App;
