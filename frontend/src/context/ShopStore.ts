import {create} from "zustand";
import {products} from "../assets/frontend_assets/assets.ts";
import {type ShopStore} from "../types/ProductTypes.ts";
import {toast} from "react-toastify";

export const useShopStore = create<ShopStore>((set) => (
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
        addToCart: (itemId, size) => (set(state => {
            if (!size) {
                console.log(size);
                toast.error("Select product size");
                return state;
            }

            let cartData = structuredClone(state.cartItems);

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

            return {cartItems: cartData};
        })),

        getCartCount: () => {
            const {cartItems} = useShopStore.getState();
            let total = 0;
            for (const productId in cartItems) {
                for (const size in cartItems[productId]) {
                    total += cartItems[productId][size];
                }
            }
            return total;
        }
    }
))