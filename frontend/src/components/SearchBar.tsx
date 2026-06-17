import {useShopStore} from "../context/ShopStore.ts";
import {assets} from "../assets/frontend_assets/assets.ts";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

const SearchBar = () => {
    const {search, setSearch, showSearch, setShowSearch} = useShopStore();
    const location = useLocation();
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (location.pathname.includes("collection") && showSearch) setVisible(true);
        else setVisible(false)
    }, [location]);

    return visible && showSearch ? (
        <div className={"border-t border-b bg-gray-50 border-gray-200 text-center"}>
            <div
                className={"inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 "}>
                <input type="text" placeholder={"Search..."} className={"flex-1 outline-none bg-inherit text-sm"}
                       value={search} onChange={(e) => setSearch(e.target.value)}/>
                <img src={assets.search_icon} className={"w-4"} alt={"search"}/>
            </div>
            <img onClick={() => {
                setShowSearch(false)
            }} src={assets.cross_icon} alt="cross" className={"w-3 inline cursor-pointer"}/>

        </div>
    ) : null;
}
export default SearchBar
