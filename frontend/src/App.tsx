import {Routes, Route, Navigate} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import CollectionPage from "./pages/CollectionPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import CartPage from "./pages/CartPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import PlaceOrderPage from "./pages/PlaceOrderPage.tsx";
import OrdersPage from "./pages/OrdersPage.tsx";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import SearchBar from "./components/SearchBar.tsx";
import {useEffect, useState} from "react";
import {useShopStore} from "./context/ShopStore.ts";
import axios from "axios";
import {ToastContainer} from "react-toastify";
import Spinner from "./components/Spinner.tsx";

const App = () => {
    const [loading, setLoading] = useState(false);
    const {setToken, backendURL, token, fetchProducts} = useShopStore();
    axios.defaults.withCredentials = true;

    const onLoad = async () => {
        setLoading(true)
        axios.get(backendURL + "api/auth/verify-user")
            .then(() => (setToken(true)))
            .catch(() => (setToken(false)))
            .finally(() => setLoading(false));

        void fetchProducts();
    }

    useEffect(() => {
        void onLoad();
    }, [])


    return loading ? <Spinner/> : (
        <div className={"px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]"}>
            <ToastContainer position="bottom-right"></ToastContainer>
            <Navbar/>
            <SearchBar/>
            <Routes>
                <Route path={"/"} element={<HomePage/>}></Route>
                <Route path={"/collection"} element={<CollectionPage/>}></Route>
                <Route path={"/product/:productId"} element={<ProductPage/>}></Route>
                <Route path={"/about"} element={<AboutPage/>}></Route>
                <Route path={"/contact"} element={<ContactPage/>}></Route>
                <Route path={"/cart"} element={<CartPage/>}></Route>
                <Route path={"/login"} element={token ? <Navigate to={"/"}/> : <LoginPage/>}></Route>
                <Route path={"/place-order"} element={<PlaceOrderPage/>}></Route>
                <Route path={"/orders"} element={<OrdersPage/>}></Route>
            </Routes>
            <Footer/>
        </div>
    )
}


export default App
