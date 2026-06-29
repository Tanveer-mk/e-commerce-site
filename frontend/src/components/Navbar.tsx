import {assets} from "../assets/frontend_assets/assets.ts";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useShopStore} from "../context/ShopStore.ts";
import axios from "axios";

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const {showSearch, setShowSearch, getCartCount, backendURL, setToken} = useShopStore();
    const cartCount = getCartCount();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post(backendURL + "api/auth/logout", {}, {withCredentials: true});
            setToken(false);
            navigate("/login");
        } catch (err: any) {
            setToken(false);
            navigate("/login");
        }
    }

    return (
        <div className={"flex justify-between items-center py-5 font-medium"}>
            <Link to={"/"}>
                <img src={assets.logo} className={"w-36"} alt="logo"/>
            </Link>
            <ul className={"hidden sm:flex gap-5 text-sm text-gray-700"}>
                <NavLink className={"flex flex-col items-center gap-1"} to={"/"}>
                    <p>HOME</p>
                    <hr className={"w-2/4 border-none h-[1.5px] bg-gray-700 hidden"}/>
                </NavLink>
                <NavLink className={"flex flex-col items-center gap-1"} to={"/collection"}>
                    <p>COLLECTION</p>
                    <hr className={"w-2/4 border-none h-[1.5px] bg-gray-700 hidden"}/>
                </NavLink>
                <NavLink className={"flex flex-col items-center gap-1"} to={"/about"}>
                    <p>ABOUT</p>
                    <hr className={"w-2/4 border-none h-[1.5px] bg-gray-700 hidden"}/>
                </NavLink>
                <NavLink className={"flex flex-col items-center gap-1"} to={"/contact"}>
                    <p>CONTACT</p>
                    <hr className={"w-2/4 border-none h-[1.5px] bg-gray-700 hidden"}/>
                </NavLink>
            </ul>
            <div className={"flex items-center gap-6"}>
                <Link to={"/collection"}>
                    <img onClick={() => {
                        setShowSearch(!showSearch);
                    }} src={assets.search_icon} alt={"search"}
                         className={"w-5 cursor-pointer"}/>
                </Link>
                <div className={"group relative"}>
                    <Link to={"/login"}>
                        <img src={assets.profile_icon} className={"w-5 cursor-pointer"} alt="profile"/>
                    </Link>
                    <div className={"group-hover:block hidden absolute right-0 pt-4 dropdown-menu"}>
                        <div className={"flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded"}>
                            <p className={"cursor-pointer hover:text-black"}>My Profile</p>
                            <p className={"cursor-pointer hover:text-black"}>Orders</p>
                            <p onClick={() => {
                                void handleLogout()
                            }} className={"cursor-pointer hover:text-black"}>Logout</p>
                        </div>
                    </div>
                </div>
                <Link to={"/cart"} className={"relative"}>
                    <img src={assets.cart_icon} alt={"cart"} className={"w-5 min-w-5"}/>
                    <p className={"absolute -right-1.25 -bottom-1.25 w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]"}>{cartCount}</p>
                </Link>
                <img onClick={() => (setVisible(true))} src={assets.menu_icon}
                     className={"sm:hidden w-5 cursor-pointer"} alt="menu"/>
            </div>
            {/*    Sidebar Menu for small screens */}
            <div
                className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className={"flex flex-col text-gray-600"}>
                    <div onClick={() => (setVisible(false))} className={"flex items-center gap-4 p-3 cursor-pointer"}>
                        <img src={assets.dropdown_icon} className={"h-4 rotate-180"} alt={"dropdown-icon"}/>
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => (setVisible(false))} to={"/"} className={"py-2 pl-6 border"}>HOME</NavLink>
                    <NavLink onClick={() => (setVisible(false))} to={"/collection"}
                             className={"py-2 pl-6 border"}>COLLECTION</NavLink>
                    <NavLink onClick={() => (setVisible(false))} to={"/about"}
                             className={"py-2 pl-6 border"}>ABOUT</NavLink>
                    <NavLink onClick={() => (setVisible(false))} to={"/contact"}
                             className={"py-2 pl-6 border"}>CONTACT</NavLink>
                </div>
            </div>
        </div>
    )
}
export default Navbar
