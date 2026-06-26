import {create} from "zustand";
import {products} from "../assets/frontend_assets/assets.ts";
import {type ShopStore} from "../types/ProductTypes.ts";
import {toast} from "react-toastify";

export const useShopStore = create<ShopStore>((set, get) => (
    {
        products,
        currency: "$",
        delivery_fee: 10,
        search: "",
        setSearch: (search: string) => set({search}),
        showSearch: false,
        setShowSearch: (show: boolean) => set({showSearch: show}),
        cartItems: {},
        // setCartItems: () => {
        // },
        addToCart: (itemId, size) => {
            if (!size) {
                toast.error("Select product size");
                return get();
            }

            let cartData = structuredClone(get().cartItems);

            if (cartData[itemId]) {
                if (cartData[itemId][size]) {
                    cartData[itemId][size] += 1;
                } else {
                    cartData[itemId][size] = 1;
                }
            } else {
                cartData[itemId] = {};
                cartData[itemId][size] = 1;
            }

            return set({cartItems: cartData});
        },

        getCartCount: () => {
            const cartItems = get().cartItems;
            let total = 0;
            for (const productId in cartItems) {
                for (const size in cartItems[productId]) {
                    total += cartItems[productId][size];
                }
            }
            return total;
        },

        updateQuantity: (itemId, size, quantity) => {
            let cartData = structuredClone(get().cartItems);
            cartData[itemId][size] = quantity;
            return set({cartItems: cartData})
        },

        getCartAmount: () => {
            let totalAmount = 0;
            let cartData = get().cartItems;
            for (const items in cartData) {
                let itemInfo = get().products.find((product) => product._id === items);
                if (itemInfo) {
                    for (const item in cartData[items]) {
                        if (cartData[items][item] > 0) {
                            totalAmount += itemInfo.price * cartData[items][item];
                        }
                    }
                } else {
                    console.error("product doesn't exist")
                }
            }
            return totalAmount
        },

    }
))