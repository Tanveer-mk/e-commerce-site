import {Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import CollectionPage from "./pages/CollectionPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import CartPage from "./pages/CartPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import PlaceOrderPage from "./pages/PlaceOrderPage.tsx";
import OrdersPage from "./pages/OrdersPage.tsx";
import NavBar from "./components/NavBar.tsx";
import Footer from "./components/Footer.tsx";
import SearchBar from "./components/SearchBar.tsx";

const App = () => {
    return (
        <div className={"px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]"}>
            <NavBar/>
            <SearchBar/>
            <Routes>
                <Route path={"/"} element={<HomePage/>}></Route>
                <Route path={"/collection"} element={<CollectionPage/>}></Route>
                <Route path={"/product/:productId"} element={<ProductPage/>}></Route>
                <Route path={"/about"} element={<AboutPage/>}></Route>
                <Route path={"/contact"} element={<ContactPage/>}></Route>
                <Route path={"/cart"} element={<CartPage/>}></Route>
                <Route path={"/login"} element={<LoginPage/>}></Route>
                <Route path={"/place-order"} element={<PlaceOrderPage/>}></Route>
                <Route path={"/orders"} element={<OrdersPage/>}></Route>
            </Routes>
            <Footer/>
        </div>
    )
}
export default App
