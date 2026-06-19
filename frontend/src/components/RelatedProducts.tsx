import {useShopStore} from "../context/ShopStore.ts";
import {useEffect, useState} from "react";
import type {Product} from "../types/ProductTypes.ts";
import Title from "./Title.tsx";
import ProductItem from "./ProductItem.tsx";

interface RelatedProductsProps {
    category: string,
    subCategory: string,
}

const RelatedProducts = ({category, subCategory}: RelatedProductsProps) => {
    const {products} = useShopStore();
    const [related, setRelated] = useState<Product[]>([]);

    useEffect(() => {
        if (products.length > 0) {
            let p = products.slice();
            p = p.filter((item) => (item.category == category && item.subCategory == subCategory));
            setRelated(p.slice(0, 5));
        }
    }, [products]);

    return (
        <div className={"my-24"}>
            <div className={"text-center text-3xl py-2"}>
                <Title text1={"RELATED"} text2={"PRODUCTS"}/>
            </div>
            <div className={"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6"}>
                {related.map((item, index) => (
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
                ))}
            </div>
        </div>
    )
}
export default RelatedProducts
