import Navbar from "./components/Navbar.tsx";
import Sidebar from "./components/Sidebar.tsx";
import {Routes, Route, Navigate} from "react-router-dom";
import AddPage from "./pages/AddPage.tsx";
import ListPage from "./pages/ListPage.tsx";
import OrdersPage from "./pages/OrdersPage.tsx";
import {useState, useEffect} from "react";
import axios from "axios";
import Login from "./components/Login.tsx";
import {ToastContainer, Bounce} from "react-toastify";
import Spinner from "./components/Spinner.tsx";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const App = () => {
    const [token, setToken] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(BACKEND_URL + "api/auth/verify-admin", {withCredentials: true})
            .then(() => setToken(true))
            .catch(() => setToken(false))
            .finally(() => setLoading(false));
    }, []);

    return (<div>
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
        />
        {
            loading ? (<div className={"bg-gray-50 min-h-screen flex items-center justify-center"}>
                <Spinner/>
            </div>) : (token ? (
                <div className={"bg-gray-50 min-h-screen"}>
                    <Navbar setToken={setToken}/>
                    <hr className={"text-gray-100"}/>
                    <div className={"flex w-full"}>
                        <Sidebar/>
                        <div className={"w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base"}>
                            <Routes>
                                <Route path="/" element={<Navigate to={"/add"}/>}/>
                                <Route path={"/add"} element={<AddPage/>}/>
                                <Route path={"/list"} element={<ListPage/>}/>
                                <Route path={"/orders"} element={<OrdersPage/>}/>
                            </Routes>
                        </div>
                    </div>
                </div>
            ) : (
                <Login setToken={setToken}/>
            ))
        }
    </div>)
}
export default App
