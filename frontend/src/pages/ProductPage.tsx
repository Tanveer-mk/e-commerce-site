import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useShopStore} from "../context/ShopStore.ts";
import {type Product} from "../types/ProductTypes.ts";
import {assets} from "../assets/frontend_assets/assets.ts";
import RelatedProducts from "../components/RelatedProducts.tsx";
import {toast, ToastContainer} from 'react-toastify';

const ProductPage = () => {
    const {productId} = useParams();
    const {products, currency, addToCart} = useShopStore();
    const [productData, setProductData] = useState<Product | undefined>()
    const [image, setImage] = useState("");
    const [size, setSize] = useState("")

    const fetchProductData = async () => {
        products.find(product => {
            if (product._id === productId) {
                setProductData(product);
                setImage(product.image[0]);
            }
        })
    }

    useEffect(() => {
        void fetchProductData();
    }, [products, productId]);


    return productData ? (
        <div className={"border-t-2 border-gray-200 pt-10 transition-opacity ease-in duration-500 opacity-100 "}>
            <ToastContainer position="top-right"></ToastContainer>
            {/*Product data*/}
            <div className={"flex gap-12 flex-col sm:flex-row "}>
                {/*    Product images*/}
                <div className={"flex-1 flex flex-col-reverse gap-3 sm:flex-row"}>
                    <div
                        className={"flex sm:flex-col overflow-x-auto justify-between sm:overflow-y-scroll sm:justify-normal sm:w-[18.7%] w-full"}>
                        {productData.image.map((image, index) => (
                            <img onClick={() => {
                                setImage(image)
                            }} key={index} src={image}
                                 className={"w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer"}
                                 alt={"product-image"}/>))}
                    </div>
                    <div className={"w-full sm:w-[80%]"}>
                        <img src={image} className={"w-full h-auto"} alt={"product-image"}/>
                    </div>
                </div>
                {/*    Product information*/}
                <div className={"flex-1"}>
                    <h1 className={"font-medium text-2xl mt-2"}>{productData.name}</h1>
                    <div className={"flex items-center gap-1 mt-2"}>
                        <img src={assets.star_icon} alt="" className={"w-2.5"}/>
                        <img src={assets.star_icon} alt="" className={"w-2.5"}/>
                        <img src={assets.star_icon} alt="" className={"w-2.5"}/>
                        <img src={assets.star_icon} alt="" className={"w-2.5"}/>
                        <img src={assets.star_dull_icon} alt="" className={"w-2.5"}/>
                        <p className={"pl-2"}>(122)</p>
                    </div>
                    <p className={"mt-5 text-3xl font-medium "}>{currency}{productData.price}</p>
                    <p className={"mt-5 text-gray-500 w-4/5"}>{productData.description}</p>
                    <div className={"flex flex-col my-8 gap-4"}>
                        <p>Select size</p>
                        <div className={"flex gap-2"}>
                            {productData.sizes.map((item, index) => (
                                <button onClick={() => {
                                    setSize(item);
                                }}
                                        className={`py-2 px-4 bg-gray-100 cursor-pointer border-gray-100 border ${size === item && "border-orange-500"}`}
                                        key={index}>{item}</button>
                            ))}
                        </div>
                    </div>
                    <button onClick={() => {
                        if (productData?.sizes.includes(size)) {
                            addToCart(productData?._id, size)
                        } else toast.error("Select product size")
                    }} className={"bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer"}>ADD TO CART
                    </button>
                    <hr className={"mt-8 sm:w-4/5 text-gray-300"}/>
                    <div className={"text-sm text-gray-500 mt-5 flex flex-col gap-1"}>
                        <p>Original 100% product.</p>
                        <p>Cash on Delivery is available on this product.</p>
                        <p>Easy return and exchange policy within 7 days.</p>
                    </div>
                </div>
            </div>
            {/*    Description and review section*/}
            <div className={"mt-20"}>
                <div className={"flex"}>
                    <b className={"border border-gray-200 px-5 py-3 text-sm"}>Description</b>
                    <p className={"border border-gray-200 px-5 py-3 text-sm"}>Reviews (122)</p>
                </div>
                <div className={"flex flex-col gap-4 border border-gray-200 px-6 py-6 text-sm text-gray-500"}>
                    <p>ewfj;laj;sjafkjsasl;fjlawwjefl;ajflajweklfja;klejfa;ljef;aejwf;ajf;ajewfjakl;ewjf;lajefjagorihaoiheflajfeijawoiefj</p>
                    <p>uahdfuiheufhahkjgdhgjkhskdhfkshdkfjhsjkhfkjahsjkfhjkwehfkjhajwkefhjkdjbdhbfjabfjasdhjfhaksjkjahwejjfhawewhfiuahweuifhawuehfuiahewfuihawiehfkahekfhwaeiuh</p>
                </div>
            </div>
            {/*    Related products*/}
            <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>

        </div>
    ) : <div className={"opacity-0"}></div>;
}
export default ProductPage
