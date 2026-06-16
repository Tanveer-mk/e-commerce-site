import * as React from "react";

const NewsLetterBox = () => {
    const onSubmitHandler = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    return (
        <div className={"text-center"}>
            <p className={"text-2xl font-medium text-gray-800"}>Subscribe now & get 20% off</p>
            <p className={"text-gray-400 mt-3"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.</p>
            <form onSubmit={onSubmitHandler}
                  className={"w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border border-gray-200 pl-3"}>
                <input className={"w-full outline-0 sm:flex-1"} type={"email"} placeholder={"Enter your email"}
                       name={"email"} required/>
                <button className={"bg-black text-xs px-10 py-4 text-white cursor-pointer"} type={"submit"}>SUBSCRIBE
                </button>
            </form>
        </div>
    )
}
export default NewsLetterBox
