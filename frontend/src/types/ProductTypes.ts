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

export interface ShopStore {
    products: Product[],
    currency: string,
    delivery_fee: number,
}