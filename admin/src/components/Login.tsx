import {useState} from "react";
import axios from "axios";
import {BACKEND_URL} from "../App.tsx";
import {toast} from "react-toastify";

const Login = ({setToken}: { setToken: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            await axios.post(BACKEND_URL + "api/auth/admin-login", {
                email,
                password,
            }, {withCredentials: true})
            toast.success("Login successful!")
            setToken(true)
        } catch (e: any) {
            if (e.response) {
                toast.error(e.response.data.message);
            } else {
                toast.error("Something went wrong");
            }
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen w-full">
            <div className={"bg-white shadow-md rounded-lg px-8 py-6 max-w-md"}>
                <h1 className={"text-2xl font-bold mb-4"}>Admin Panel</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className={"mb-3 min-w-72"}>
                        <p className={"text-sm font-medium text-gray-700 mb-2"}>Email address: </p>
                        <input className={"rounded-md w-full px-3 py-2 border border-gray-300 outline-none"}
                               type="email"
                               placeholder="your@email.com"
                               required
                               value={email}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                   setEmail(e.target.value)
                               }}
                        />
                    </div>
                    <div className={"mb-3 min-w-72"}>
                        <p className={"text-sm font-medium text-gray-700 mb-2"}>Password: </p>
                        <input className={"rounded-md w-full px-3 py-2 border border-gray-300 outline-none"}
                               type="password"
                               placeholder="Enter your password"
                               required
                               value={password}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                   setPassword(e.target.value)
                               }}
                        />
                    </div>
                    <button className={"mt-2 w-full py-2 px-4 rounded-md text-white bg-black cursor-pointer"}
                            type={"submit"}>Login
                    </button>
                </form>
            </div>
        </div>
    )
}
export default Login
