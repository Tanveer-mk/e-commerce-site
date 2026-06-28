import axios from "axios";
import {useEffect} from "react";
import {BACKEND_URL} from "../App.tsx";

interface OrdersPageProps {
    setToken: React.Dispatch<React.SetStateAction<boolean>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const OrdersPage = ({setToken, setLoading}: OrdersPageProps) => {

    useEffect(() => {
        axios.get(BACKEND_URL + "api/auth/verify-admin", {withCredentials: true})
            .then(() => setToken(true))
            .catch(() => setToken(false))
            .finally(() => setLoading(false));
    }, []);
    return (
        <div>OrdersPage</div>
    )
}
export default OrdersPage
