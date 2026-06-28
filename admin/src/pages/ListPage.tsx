import axios from "axios";
import {useEffect, useState} from "react";
import {BACKEND_URL, currency} from "../App.tsx";
import {toast} from "react-toastify";
import type {Product} from "../Types/Product.ts";

interface ListPageProps {
    setToken: React.Dispatch<React.SetStateAction<boolean>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const ListPage = ({setToken, setLoading}: ListPageProps) => {

    useEffect(() => {
        axios.get(BACKEND_URL + "api/auth/verify-admin", {withCredentials: true})
            .then(() => setToken(true))
            .catch(() => setToken(false))
            .finally(() => setLoading(false));
    }, []);

    const [list, setList] = useState<Product[]>([])

    const fetchList = async () => {
        try {
            const response = await axios.get(BACKEND_URL + "api/products/get-all", {withCredentials: true});
            if (response.status === 200) {
                setList(response.data.products)
            }
        } catch (err: any) {
            console.error("Error fetching list in ListPage: " + err.message);
            toast.error(err.response.data.message)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            const response = await axios.post(BACKEND_URL + "api/products/remove", {id}, {withCredentials: true});
            if (response.status === 200) {
                setList((prev) => (prev.filter((i) => i._id !== id)))
                toast.success(response.data.message)
            }
        } catch (err: any) {
            console.error("Error deleting product in ListPage: " + err.response.data.message);
            toast.error(err.response.data.message)
        }
    }

    useEffect(() => {
        void fetchList();
    }, []);

    return (
        <div>
            <p className={"mb-2"}>All Products list</p>
            <div className="flex flex-col gap-2">
                {/*    list table title */}
                <div
                    className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm border-gray-300">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b className={"text-center"}>Action</b>
                </div>
                {/*    Product list*/}
                {list.map((product) => (
                    <div
                        className={"grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 text-sm border border-gray-300"}
                        key={product._id}>
                        <img className={"w-12"} src={product.image[0]} alt="image"/>
                        <p>{product.name}</p>
                        <p>{product.category}</p>
                        <p>{currency}{product.price}</p>
                        <p onClick={() => {
                            void handleDelete(product._id)
                        }} className={"text-right md:text-center cursor-pointer text-lg"}>X</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default ListPage
