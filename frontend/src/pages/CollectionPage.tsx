import {useShopStore} from "../context/ShopStore.ts";
import {useEffect, useState} from "react";
import {assets} from "../assets/frontend_assets/assets.ts";
import Title from "../components/Title.tsx";
import ProductItem from "../components/ProductItem.tsx";
import type {Product} from "../types/ProductTypes.ts";

const CollectionPage = () => {
    const {products, search, showSearch} = useShopStore();
    const [showFilter, setShowFilter] = useState(false)
    const [category, setCategory] = useState<string[]>([]);
    const [subCategory, setSubCategory] = useState<string[]>([]);
    const [sortType, setSortType] = useState("relevance");
    const [filterProducts, setFilterProducts] = useState<Product[]>([])

    const categoryToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => (prev.filter(item => item !== e.target.value)))
        } else {
            setCategory(prev => ([...prev, e.target.value]))
        }
    }

    const subCategoryToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory(prev => (prev.filter(item => item !== e.target.value)))
        } else {
            setSubCategory(prev => ([...prev, e.target.value]))
        }
    }

    const applyFilter = () => {
        let p: Product[] = products.slice();

        if (showSearch && search.length > 0) {
            p = p.filter(item => (item.name.toLowerCase().includes(search.toLowerCase())));
        }

        if (category.length > 0) {
            p = p.filter(item => (category.includes(item.category)))
        }

        if (subCategory.length > 0) {
            p = p.filter(item => (subCategory.includes(item.subCategory)))
        }

        setFilterProducts(p);
    }

    const sortProduct = () => {
        let p = filterProducts.slice();
        switch (sortType) {
            case "low-high":
                setFilterProducts(p.sort((a, b) => a.price - b.price))
                break;
            case "high-low":
                setFilterProducts(p.sort((a, b) => b.price - a.price))
                break;
            default:
                applyFilter();
                break;
        }
    }

    useEffect(() => {
        sortProduct();
    }, [sortType])

    useEffect(() => {
        applyFilter();
    }, [products, category, subCategory, search, showSearch])

    return (
        <div className={"flex border-gray-200 flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t"}>
            {/*filter options*/}
            <div className={"min-w-60"}>
                <p onClick={() => {
                    setShowFilter((prev) => !prev)
                }}
                   className={"my-2 flex text-xl items-center cursor-pointer gap-2"}>FILTERS
                    <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
                         alt={"dropdownIcon"}/>
                </p>
                {/*    category filters*/}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
                    <p className={"mb-3 text-sm font-medium"}>CATEGORIES</p>
                    <div className={"flex flex-col gap-2 text-sm font-light text-gray-700"}>
                        <p className={"flex gap-2"}>
                            <input onChange={categoryToggle} type={"checkbox"} className={"w-3"} value={"Men"}/> Men
                        </p>
                        <p className={"flex gap-2"}>
                            <input onChange={categoryToggle} type={"checkbox"} className={"w-3"} value={"Women"}/> Women
                        </p>
                        <p className={"flex gap-2"}>
                            <input onChange={categoryToggle} type={"checkbox"} className={"w-3"} value={"Kids"}/> Kids
                        </p>
                    </div>
                </div>
                {/*    subcategory filter*/}
                <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block`}>
                    <p className={"mb-3 text-sm font-medium"}>SUB-CATEGORIES</p>
                    <div className={"flex flex-col gap-2 text-sm font-light text-gray-700"}>
                        <p className={"flex gap-2"}>
                            <input onChange={subCategoryToggle} type={"checkbox"} className={"w-3"}
                                   value={"Topwear"}/> Topwear
                        </p>
                        <p className={"flex gap-2"}>
                            <input onChange={subCategoryToggle} type={"checkbox"} className={"w-3"}
                                   value={"Bottomwear"}/> Bottomwear
                        </p>
                        <p className={"flex gap-2"}>
                            <input onChange={subCategoryToggle} type={"checkbox"} className={"w-3"}
                                   value={"Winterwear"}/> Winterwear
                        </p>
                    </div>
                </div>
            </div>
            {/*    Right side*/}
            <div className={"flex-1"}>
                <div className={"flex justify-between text-base sm:text-2xl mb-4"}>
                    <Title text1={"ALL"} text2={"COLLECTIONS"}/>
                    {/*    product sort*/}
                    <select onChange={(e) => (setSortType(e.target.value))}
                            className={"border-2 border-gray-300 text-sm px-2"}>
                        <option value={"relevance"}>Sort by: Relevance</option>
                        <option value={"low-high"}>Sort by: Low to High</option>
                        <option value={"high-low"}>Sort by: High to Low</option>
                    </select>
                </div>
                {/*    Map products*/}
                <div className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6"}>
                    {
                        filterProducts.map((product, index) => (
                            <ProductItem key={index} id={product._id} image={product.image} name={product.name}
                                         price={product.price}/>))
                    }
                </div>
            </div>
        </div>
    )
}
export default CollectionPage
