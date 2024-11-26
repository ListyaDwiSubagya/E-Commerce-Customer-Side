import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {products} from "../assets/assets"

export const ShopContect = createContext();

const ShopContextProvider = (props) => {
    const currency = "$";
    const delivery_fee = 10;
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItem, setCartItem] = useState({});
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('email'));

    

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Select Product Size");
            return;
        }

        let cartData = structuredClone(cartItem);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] ={};
            cartData[itemId][size] = 1;
        }

        setCartItem(cartData)
    };

    const getCartCount = () => {
        let totalCount = 0;
        Object.values(cartItem).forEach((item) =>
            Object.values(item).forEach((qty) => {
                totalCount += qty;
            })
        );
        return totalCount;
    };

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItem);
        cartData[itemId][size] = quantity;
        setCartItem(cartData);
    };

    const getCartAmount = () => {
       let totalAmount = 0;
       for (const items in cartItem) {
        let itemInfo = products.find((product) => product._id === items);
        for (const item in cartItem[items]) {
            try {
                if (cartItem[items][item] > 0) {
                    totalAmount += itemInfo.price * cartItem[items][item];
                }
            } catch (error) {

            }
            
        }
       }
       return totalAmount;
    };

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItem,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate
    };

    return (
        <ShopContect.Provider value={value}>
            {props.children}
        </ShopContect.Provider>
    );
};

export default ShopContextProvider;
