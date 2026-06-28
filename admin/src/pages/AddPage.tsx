import axios from "axios";
import {useEffect, useState} from "react";
import {BACKEND_URL} from "../App.tsx";
import {assets} from "../assets/admin_assets/assets.ts";
import {toast} from "react-toastify";
import Spinner from "../components/Spinner.tsx";

interface AddPageProps {
    setToken: React.Dispatch<React.SetStateAction<boolean>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const AddPage = ({setToken, setLoading}: AddPageProps) => {
    const [pageLoading, setPageLoading] = useState(false)

    const [image1, setImage1] = useState<File | undefined>(undefined)
    const [image2, setImage2] = useState<File | undefined>(undefined)
    const [image3, setImage3] = useState<File | undefined>(undefined)
    const [image4, setImage4] = useState<File | undefined>(undefined)

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("Men")
    const [subCategory, setSubCategory] = useState("Topwear")
    const [price, setPrice] = useState("")
    const [sizes, setSizes] = useState<string[]>([])
    const [bestseller, setBestseller] = useState(false)

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setPageLoading(true)
            if (sizes.length == 0) {
                toast.error("Please select sizes")
                return;
            }
            if (!(image1 || image2 || image3 || image4)) {
                toast.error("Please add at least one image")
                return;
            }

            const formData = new FormData();

            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", String(price));
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("bestseller", String(bestseller));
            formData.append("sizes", JSON.stringify(sizes));

            if (image1) formData.append("image1", image1);
            if (image2) formData.append("image2", image2);
            if (image3) formData.append("image3", image3);
            if (image4) formData.append("image4", image4);

            await axios.post(BACKEND_URL + "api/products/add", formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            setImage1(undefined);
            setImage2(undefined);
            setImage3(undefined);
            setImage4(undefined);

            setName("")
            setDescription("")
            setCategory("Men")
            setSubCategory("Topwear")
            setPrice("")
            setSizes([])
            setBestseller(false)

            toast.success("Added successfully.")
        } catch (err: any) {
            console.error("Error in adding product: " + err.message)
            toast.error("Error in adding product")
        } finally {
            setPageLoading(false)
        }
    }

    useEffect(() => {
        axios.get(BACKEND_URL + "api/auth/verify-admin", {withCredentials: true})
            .then(() => setToken(true))
            .catch(() => setToken(false))
            .finally(() => setLoading(false));
    }, []);
    return pageLoading ? <Spinner/> : (
        <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
            <div className="">
                <p className={"mb-2"}>Upload Image: </p>
                <div className={"flex gap-2"}>
                    <label htmlFor="image1">
                        <img className={"w-20 cursor-pointer"}
                             src={image1 ? URL.createObjectURL(image1) : assets.upload_area}
                             alt="upload-area"/>
                        <input onChange={(e) => {
                            setImage1(e.target.files?.[0])
                        }
                        } type="file" id={"image1"} hidden/>
                    </label>
                    <label htmlFor="image2">
                        <img className={"w-20 cursor-pointer"}
                             src={image2 ? URL.createObjectURL(image2) : assets.upload_area}
                             alt="upload-area"/>
                        <input onChange={(e) => {
                            setImage2(e.target.files?.[0])
                        }
                        } type="file" id={"image2"} hidden/>
                    </label>
                    <label htmlFor="image3">
                        <img className={"w-20 cursor-pointer"}
                             src={image3 ? URL.createObjectURL(image3) : assets.upload_area}
                             alt="upload-area"/>
                        <input onChange={(e) => {
                            setImage3(e.target.files?.[0])
                        }
                        } type="file" id={"image3"} hidden/>
                    </label>
                    <label htmlFor="image4">
                        <img className={"w-20 cursor-pointer"}
                             src={image4 ? URL.createObjectURL(image4) : assets.upload_area}
                             alt="upload-area"/>
                        <input onChange={(e) => {
                            setImage4(e.target.files?.[0])
                        }
                        } type="file" id={"image4"} hidden/>
                    </label>
                </div>
            </div>
            <div className={"w-full"}>
                <p className={"mb-2"}>Product Name</p>
                <input onChange={(e) => setName(e.target.value)} type="text" value={name}
                       className={"w-full max-w-125 px-3 py-2"} placeholder={"Type here"}
                       required={true}/>
            </div>
            <div className={"w-full"}>
                <p className={"mb-2"}>Product description</p>
                <textarea onChange={(e) => {
                    setDescription(e.target.value);
                }} value={description}
                          className={"w-full max-w-125 px-3 py-2"} placeholder={"Write content here"}
                          required={true}/>
            </div>
            <div className={"flex flex-col sm:flex-row gap-2 w-full sm:gap-8"}>
                <div>
                    <p className={"mb-2"}>Product Category</p>
                    <select onChange={(e) => {
                        setCategory(e.target.value)
                    }} className={"w-full px-3 py-2"} value={category}>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                </div>
                <div>
                    <p className={"mb-2"}>Product Subcategory</p>
                    <select onChange={(e) => {
                        setSubCategory(e.target.value)
                    }} className={"w-full px-3 py-2"} value={subCategory}>
                        <option value="Topwear">Topwear</option>
                        <option value="Bottomwear">Bottomwear</option>
                        <option value="Winterwear">Winterwear</option>
                    </select>
                </div>
                <div>
                    <p className={"mb-2"}>Product price</p>
                    <input onChange={(e) => {
                        setPrice(e.target.value)
                    }} value={price} required={true} className={"w-full px-3 py-2 sm:w-30"} type="number"
                           placeholder={"25"}/>
                </div>
            </div>
            <div>
                <p className={"mb-2"}>Product sizes</p>
                <div className="flex gap-3">
                    <div onClick={() => {
                        setSizes((prev) =>
                            prev.includes('S') ? prev.filter((item) => item !== 'S') : [...prev, 'S']
                        )
                    }}>
                        <p className={`bg-white px-3 py-1 cursor-pointer border border-gray-300 ${sizes.includes('S') && "sizes"}`}>S</p>
                    </div>
                    <div onClick={() => {
                        setSizes((prev) =>
                            prev.includes('M') ? prev.filter((item) => item !== 'M') : [...prev, 'M']
                        )
                    }}>
                        <p className={`bg-white px-3 py-1 cursor-pointer border border-gray-300 ${sizes.includes('M') && "sizes"}`}>M</p>
                    </div>
                    <div onClick={() => {
                        setSizes((prev) =>
                            prev.includes('L') ? prev.filter((item) => item !== 'L') : [...prev, 'L']
                        )
                    }}>
                        <p className={`bg-white px-3 py-1 cursor-pointer border border-gray-300 ${sizes.includes('L') && "sizes"}`}>L</p>
                    </div>
                    <div onClick={() => {
                        setSizes((prev) =>
                            prev.includes('XL') ? prev.filter((item) => item !== 'XL') : [...prev, 'XL']
                        )
                    }}>
                        <p className={`bg-white px-3 py-1 cursor-pointer border border-gray-300 ${sizes.includes('XL') && "sizes"}`}>XL</p>
                    </div>
                    <div onClick={() => {
                        setSizes((prev) =>
                            prev.includes('XXL') ? prev.filter((item) => item !== 'XXL') : [...prev, 'XXL']
                        )
                    }}>
                        <p className={`bg-white px-3 py-1 cursor-pointer border border-gray-300 ${sizes.includes('XXL') && "sizes"}`}>XXL</p>
                    </div>
                </div>
            </div>

            <div className={"flex gap-2 mt-2"}>
                <input onChange={(e) => {
                    setBestseller(e.target.checked)
                }} checked={bestseller} type="checkbox" id={"bestseller"}/>
                <label className={"cursor-pointer"} htmlFor="bestseller">
                    Add to bestseller
                </label>
            </div>

            <button className={"w-28 py-3 mt-4 bg-black text-white cursor-pointer"} type={"submit"}>Add</button>

        </form>
    )
}
export default AddPage
