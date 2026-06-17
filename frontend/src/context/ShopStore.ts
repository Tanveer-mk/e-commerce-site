import {create} from "zustand";
import {products} from "../assets/frontend_assets/assets.ts";
import {type ShopStore} from "../types/ProductTypes.ts";

export const useShopStore = create<ShopStore>((set) => (
    {
        products,
        currency: "$",
        delivery_fee: 10,
        search: "",
        setSearch: (search: string) => set({search}),
        showSearch: false,
        setShowSearch: (show: boolean) => set({showSearch: show})

    }
))