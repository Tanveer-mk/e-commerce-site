import Title from "../components/Title.tsx";
import CartTotal from "../components/CartTotal.tsx";
import {assets} from "../assets/frontend_assets/assets.ts";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const PlaceOrderPage = () => {
    const [paymentSelected, setPaymentSelected] = useState("cod")
    const navigate = useNavigate()
    return (
        <div
            className={"flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t border-gray-200"}>
            {/*Left side of place order page*/}
            <div className={"flex flex-col gap-4 w-full sm:max-w-120"}>
                <div className={"text-xl sm:text-2xl my-3"}>
                    <Title text1={"DELIVERY"} text2={"INFORMATION"}/>
                </div>
                <div className={"flex gap-3"}>
                    <input type={"text"} placeholder={"First name"}
                           className={"border border-gray-300 rounded py-1.5 px-3.5 w-full"}/>
                    <input type={"text"} placeholder={"Last name"}
                           className={"border border-gray-300 rounded py-1.5 px-3.5 w-full"}/>
                </div>
                <input type={"email"} placeholder={"Email address"}
                       className={"border border-gray-300 rounded py-1.5 px-3.5 w-full"}/>
                <input type={"text"} placeholder={"Street"}
                       className={"border border-gray-300 rounded py-1.5 px-3.5 w-full"}/>
                <div className={"flex gap-3"}>
                    <input type={"text"} placeholder={"City"}
                           className={"border border-gray-300 rounded py-1.5 px-3.5 w-full"}/>
                    <input type={"text"} placeholder={"State"}
                           className={"border border-gray-300 rounded py-1.5 px-3.5 w-full"}/>
                </div>
                <div className={"flex gap-3"}>
                    <input type={"number"} placeholder={"Zip code"}
                           className={"border border-gray-300 rounded py-1.5 px-3.5 w-full"}/>
                    <input type={"text"} placeholder={"Country"}
                           className={"border border-gray-300 rounded py-1.5 px-3.5 w-full"}/>
                </div>
                <input type={"number"} placeholder={"Phone"}
                       className={"border border-gray-300 rounded py-1.5 px-3.5 w-full"}/>
            </div>
            {/*    Right side*/}
            <div className={"mt-8"}>
                <div className={"mt-8 min-w-80"}>
                    <CartTotal/>
                </div>

                <div className={"mt-12"}>
                    <Title text1={"PAYMENT"} text2={"METHOD"}/>
                </div>

                <div className={"flex gap-3 flex-col lg:flex-row"}>
                    {/*    Payment method selection*/}
                    <div onClick={() => {
                        setPaymentSelected("stripe")
                    }} className={"flex items-center gap-3 border p-2 px-3 cursor-pointer border-gray-200"}>
                        <p
                            className={`min-w-3.5 h-3.5 border rounded-full border-gray-300 ${paymentSelected === "stripe" ? "bg-green-400" : ""}`}></p>
                        <img src={assets.stripe_logo} alt="stripe logo" className={"h-5 mx-4"}/>
                    </div>
                    <div onClick={() => {
                        setPaymentSelected("razor")
                    }} className={"flex items-center gap-3 border p-2 px-3 cursor-pointer border-gray-200"}>
                        <p
                            className={`min-w-3.5 h-3.5 border rounded-full border-gray-300 ${paymentSelected === "razor" ? "bg-green-400" : ""}`}></p>
                        <img src={assets.razorpay_logo} alt="stripe logo" className={"h-5 mx-4"}/>
                    </div>
                    <div onClick={() => {
                        setPaymentSelected("cod")
                    }} className={"flex items-center gap-3 border p-2 px-3 cursor-pointer border-gray-200"}>
                        <p className={`min-w-3.5 h-3.5 border rounded-full border-gray-300 ${paymentSelected === "cod" ? "bg-green-400" : ""}`}></p>
                        <p className={"text-gray-500 text-sm font-medium mx-4"}>CASH ON DELIVERY</p>
                    </div>
                </div>
                <div className={"w-full text-end mt-8"}>
                    <button className={"text-white bg-black px-16 py-3 text-sm cursor-pointer"} onClick={() => {
                        navigate("/orders")
                    }}>PLACE ORDER
                    </button>
                </div>
            </div>
        </div>
    )
}
export default PlaceOrderPage
