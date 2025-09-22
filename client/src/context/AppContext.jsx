import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();


export const AppContextProvider = ({ children }) => {
    const currency = import.meta.VITE_currency;

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
        console.log("hesgg:::",structuredClone(cartItems));
        
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
    const updateCartItem = (itemId,qty) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = qty;
        setCartItems(cartData);
        toast.success("Cart updated")
    }
    //remove item from cart
    const removeFromcart = (itemId) => {
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



    useEffect(() => {
        console.log("fetching products");
        
        fetchProducts();
    }, []);


    const value = {
        navigate, user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin, products,
        currency, addToCart, removeFromcart, cartItems, updateCartItem,searchQuery,setSearchQuery
    }
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>

}

