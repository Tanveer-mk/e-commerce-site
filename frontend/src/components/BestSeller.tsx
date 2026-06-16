import {useShopStore} from "../context/ShopStore.ts";
import Title from "./Title.tsx";
import {type Product} from "../types/ProductTypes.ts";
import {useEffect, useState} from "react";
import ProductItem from "./ProductItem.tsx";

const BestSeller = () => {
    const [bestSellers, setBestSellers] = useState<Product[]>([]);
    const {products} = useShopStore();

    useEffect(() => {
        setBestSellers(products.filter((product) => product.bestseller).slice(0, 5));
    }, [])

    return (
        <div className="my-10">
            <div className={"text-center py-8 text-3xl"}>
                <Title text1={"BEST"} text2={"SELLERS"}/>
                <p className={"w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600"}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua.
                </p>
            </div>
            {/*    Rendering products*/}
            <div className={"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6"}>
                {bestSellers.map((product, index) => (
                    <ProductItem key={index} id={product._id} image={product.image} name={product.name}
                                 price={product.price}/>))}
            </div>
        </div>
    )
}
export default BestSeller;
