import {useShopStore} from "../context/ShopStore.ts";
import {useEffect, useState} from "react";
import type {CartData, Product} from "../types/ProductTypes.ts";
import Title from "../components/Title.tsx";
import {assets} from "../assets/frontend_assets/assets.ts";
import CartTotal from "../components/CartTotal.tsx";
import {useNavigate} from "react-router-dom";

const CartPage = () => {
    const {products, currency, cartItems, updateQuantity} = useShopStore();
    const navigate = useNavigate();
    const [cartData, setCartData] = useState<CartData[]>([])

    useEffect(() => {
        let tempData: CartData[] = [];
        for (const id in cartItems) {
            for (const size in cartItems[id]) {
                if (cartItems[id][size] > 0) {
                    tempData.push({
                        _id: id,
                        size,
                        quantity: cartItems[id][size],
                    })
                }
            }
        }
        setCartData(tempData);
    }, [cartItems]);

    return (
        <div className={"border-t border-gray-200 pt-14"}>
            <div className={"text-2xl mb-3"}>
                <Title text1={"YOUR"} text2={"CART"}/>
            </div>
            <div>
                {cartData.map((item, index) => {
                    const productData: Product | undefined = products.find((product) => (product._id === item._id));

                    return productData ? <div key={index}
                                              className={"py-4 border-t border-b border-gray-200 text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"}>
                        <div className={"flex items-start gap-6"}>
                            <img src={productData.image[0]} alt="image" className={"w-16 sm:w-20"}/>
                            <div>
                                <p className={"text-xs sm:text-lg font-medium"}>{productData.name}</p>
                                <div className={"flex items-center gap-5 mt-2 border-gray-200"}>
                                    <p>{currency}{productData.price}</p>
                                    <p className={"px-2 sm:px-3 sm:py-1 border bg-slate-50 border-gray-200"}>{item.size}</p>
                                </div>
                            </div>
                        </div>
                        <input type="number" min={1} defaultValue={item.quantity} onChange={(e) => {
                            updateQuantity(item._id, item.size, Number(e.target.value));
                        }}
                               className={"border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 border-gray-200"}/>
                        <img src={assets.bin_icon} className={"w-4 mr-4 sm:w-5 cursor-pointer"}
                             onClick={() => {
                                 updateQuantity(item._id, item.size, 0)
                             }} alt="bin"/>
                    </div> : null;
                })}
            </div>
            <div className={"flex justify-end my-20"}>
                <div className={"w-full sm:w-112.5"}>
                    <CartTotal/>
                    <div className={"w-full text-end"}>
                        <button onClick={() => navigate("/place-order")
                        } className={"bg-black text-white text-sm my-8 px-8 py-3 cursor-pointer"}>PROCEED TO
                            CHECKOUT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CartPage
