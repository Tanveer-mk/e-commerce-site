import {assets} from "../assets/admin_assets/assets.ts";
import axios from "axios";
import {BACKEND_URL} from "../App.tsx";
import {toast} from "react-toastify";

const Navbar = ({setToken}: { setToken: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const logoutHandler = async () => {
        await axios.post(BACKEND_URL + "api/auth/admin-logout", {}, {withCredentials: true})
        toast.success("Logout successful!")
        setToken(false)
    }
    return (
        <div className={"flex items-center py-2 px-[4%] justify-between"}>
            <img className={"w-[max(10%,80px)]"} src={assets.logo} alt="logo"/>
            <button onClick={logoutHandler}
                    className={"bg-gray-600 text-white px-5 py-2 sm:px-7 rounded-full cursor-pointer"}>Logout
            </button>
        </div>
    )
}
export default Navbar
