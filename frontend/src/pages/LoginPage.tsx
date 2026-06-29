import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useShopStore} from "../context/ShopStore.ts";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const [currentState, setCurrentState] = useState("Sign Up")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const {backendURL, setToken, token} = useShopStore();
    const navigate = useNavigate()

    const onSubmitHandler = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (currentState === "Sign Up") {
                await axios.post(backendURL + "api/auth/register", {
                    name,
                    email,
                    password
                }, {withCredentials: true});
                setToken(true)

            } else {
                await axios.post(backendURL + "api/auth/login", {
                    email,
                    password
                }, {withCredentials: true});
                setToken(true)

            }
        } catch (err: any) {
            toast.error(err.response.data.message)
            setToken(false);
            console.error("error in login: " + err.response.data.message)
        }
    }

    useEffect(() => {
        if (token) {
            navigate("/")
        }
    }, [token])

    return (
        <form onSubmit={onSubmitHandler}
              className={"flex flex-col items-center w-[90%] max-w-96 m-auto mt-14 gap-4 text-gray-800"}>
            <div className={"inline-flex items-center gap-2 mb-2 mt-10"}>
                <p className={"prata-regular text-3xl"}>{currentState}</p>
                <hr className={"border-none h-[1.5px] w-8 bg-gray-800"}/>
            </div>
            {currentState === "Sign Up" ? (
                <input onChange={(e) => {
                    setName(e.target.value)
                }} type="text" className={"w-full px-3 py-2 border border-gray-800"} placeholder={"Name"}
                       required={true} value={name}/>
            ) : null}
            <input value={email} onChange={(e) => {
                setEmail(e.target.value)
            }} type="email" className={"w-full px-3 py-2 border border-gray-800"} placeholder={"Email"}
                   required={true}/>
            <input value={password} onChange={(e) => {
                setPassword(e.target.value)
            }} type="password" className={"w-full px-3 py-2 border border-gray-800"} placeholder={"Password"}
                   required={true}/>
            <div className={"w-full flex justify-between text-sm -m-2"}>
                <p className={"cursor-pointer"}>Forgot your password?</p>
                {currentState === "Sign Up" ?
                    <p onClick={() => {
                        setCurrentState("Login")
                    }} className={"cursor-pointer"}>Login here</p> :
                    <p onClick={() => {
                        setCurrentState("Sign Up")
                    }} className={"cursor-pointer"}>Create account</p>}
            </div>
            <button
                className={"bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer"}>{currentState === "Login" ? 'Sign in' : "Sign up"}</button>
        </form>
    )
}
export default LoginPage
