import {useState} from "react";

const LoginPage = () => {
    const [currentState, setCurrentState] = useState("Sign Up")
    const onSubmitHandler = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={onSubmitHandler}
              className={"flex flex-col items-center w-[90%] max-w-96 m-auto mt-14 gap-4 text-gray-800"}>
            <div className={"inline-flex items-center gap-2 mb-2 mt-10"}>
                <p className={"prata-regular text-3xl"}>{currentState}</p>
                <hr className={"border-none h-[1.5px] w-8 bg-gray-800"}/>
            </div>
            {currentState === "Sign Up" ? (
                <input type="text" className={"w-full px-3 py-2 border border-gray-800"} placeholder={"Name"}
                       required={true}/>
            ) : null}
            <input type="email" className={"w-full px-3 py-2 border border-gray-800"} placeholder={"Email"}
                   required={true}/>
            <input type="password" className={"w-full px-3 py-2 border border-gray-800"} placeholder={"Password"}
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
