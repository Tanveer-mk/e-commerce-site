import {assets} from "../assets/frontend_assets/assets.ts";

const Footer = () => {
    return (
        <div>
            <div className={"flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm"}>
                <div>
                    <img className={"mb-5 w-32"} src={assets.logo} alt="logo"/>
                    <p className={"w-full md:w-2/3 text-gray-600"}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                        eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                    </p>
                </div>

                <div>
                    <p className={"text-xl font-medium mb-5"}>COMPANY</p>
                    <ul className={"flex flex-col gap-1 text-gray-600"}>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                <div>
                    <p className={"text-xl font-medium mb-5"}>GET IN TOUCH</p>
                    <ul className={"flex flex-col gap-1 text-gray-600"}>
                        <li>+1-212-142-1209</li>
                        <li>contact@foreveryou.com</li>
                    </ul>
                </div>

            </div>
            <div>
                <hr className={"text-gray-200"}/>
                <p className={"py-5 text-center text-sm"}>Copyright 2026@forever.com - All Rights Reserved.</p>
            </div>
        </div>
    )
}
export default Footer
