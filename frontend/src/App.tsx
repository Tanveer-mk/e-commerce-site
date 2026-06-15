import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Collection from "./pages/Collection.tsx";
import Contact from "./pages/Contact.tsx";
import Product from "./pages/Product.tsx";
import About from "./pages/About.tsx";
import Cart from "./pages/Cart.tsx";
import Login from "./pages/Login.tsx";
import PlaceOrder from "./pages/PlaceOrder.tsx";
import Orders from "./pages/Orders.tsx";
import NavBar from "./components/NavBar.tsx";

const App = () => {
    return (
        <div className={"px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]"}>
            <NavBar />
            <Routes>
                <Route path={"/"} element={<Home />}></Route>
                <Route path={"/collection"} element={<Collection />}></Route>
                <Route path={"/about"} element={<About />}></Route>
                <Route path={"/contact"} element={<Contact />}></Route>
                <Route path={"/product/:productid"} element={<Product />}></Route>
                <Route path={"/cart"} element={<Cart />}></Route>
                <Route path={"/login"} element={<Login />}></Route>
                <Route path={"/place-order"} element={<PlaceOrder />}></Route>
                <Route path={"/orders"} element={<Orders />}></Route>
            </Routes>
        </div>
    )
}
export default App
