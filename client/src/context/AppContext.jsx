import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();


export const AppContextProvider = ({ children }) => {
    const currency = import.meta.env.VITE_currency;

    const navigate = useNavigate();
    const [user, setUser] = useState(true)
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);

    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState({});

    // console.log("cartItems:", cartItems);



    const fetchProducts = async () => {
        setProducts(dummyProducts);
    }
    //add product to cart
    const addToCart = (itemId) => {
        console.log("itemId::::::", itemId);
        // return
        let cartData = structuredClone(cartItems);
        console.log("hesgg:::", structuredClone(cartItems));

        // return
        if (cartData[itemId]) { // Corrected line
            cartData[itemId] += 1;
            console.log("if cartData[itemId]:", cartData);

        } else {
            cartData[itemId] = 1;
            console.log("else cartData[itemId]:", cartData);
        }
        setCartItems(cartData);
        toast.success("Item added to cart")
    }
    //update cart item quantity
    const updateCartItem = (itemId, qty) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = qty;
        setCartItems(cartData);
        toast.success("Cart updated")
    }
    //remove item from cart
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        }
        setCartItems(cartData);
        toast.success("Item removed from cart");
    }

    // get cart item count
    const getCartCount = () => {
        let totalCount = 0;
        for (const item in cartItems) {
            totalCount += cartItems[item];
        }
        
        return totalCount;
    }
    // get cart total amount
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            let itemInfo = products.find((product) => product._id === item);
            if (cartItems[item] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[item];
            }

        }
        return Math.floor(totalAmount * 100) / 100;

    }


    useEffect(() => {
        console.log("fetching products");

        fetchProducts();
    }, []);


    const value = {
        navigate, user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin, products,
        currency, addToCart, removeFromCart, cartItems, updateCartItem, searchQuery, setSearchQuery,
        getCartCount, getCartAmount
    }
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>

}

