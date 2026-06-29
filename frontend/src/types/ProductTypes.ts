export interface Product {
    _id: string,
    name: string,
    description: string,
    price: number,
    image: string[],
    category: string,
    subCategory: string,
    sizes: string[],
    date: number,
    bestseller: boolean
}

export interface ProductDb extends Product {
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface CartData {
    _id: string,
    size: string,
    quantity: number,
}


export interface ShopStore {
    token: boolean;
    setToken: (value: boolean) => void;
    backendURL: string,
    products: ProductDb[],
    currency: string,
    delivery_fee: number,
    search: string,
    setSearch: (search: string) => void;
    showSearch: boolean;
    setShowSearch: (show: boolean) => void;
    cartItems: {
        [productId: string]: {
            [size: string]: number,
        }
    }
    // setCartItems: () => void;
    addToCart: (itemId: string, size: string) => void;
    // cartCount: number;
    getCartCount: () => number;
    updateQuantity: (itemId: string, size: string, quantity: number) => void;
    getCartAmount: () => number;
    fetchProducts: () => Promise<void>;
}