import {useShopStore} from "../context/ShopStore.ts";
import {Link} from "react-router-dom";

interface ProductItemProps {
    id: string,
    image: string[],
    name: string,
    price: number,
}

const ProductItem = ({id, image, name, price}: ProductItemProps) => {
    const {currency} = useShopStore();
    return (
        <Link className={"text-gray-700 cursor-pointer"} to={`/product/${id}`}>
            <div className={"overflow-hidden"}>
                <img className={"hover:scale-110 transition ease-in-out"} src={image[0]} alt={name}/>
            </div>
            <p className={"pt-3 pb-1 text-sm"}>{name}</p>
            <p className={"text-sm font-medium"}>{currency}{price}</p>
        </Link>
    )
}
export default ProductItem
