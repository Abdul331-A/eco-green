import React, { use, useContext, useEffect } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';


const ProductCard = ({ product }) => {
    const [count, setCount] = React.useState(0);
    const [isAddCart, setIsAddCart] = React.useState(false);
    const { currency, addToCart, removeFromCart, cartItems, navigate, updateCartItem } = useContext(AppContext);


    console.log("cartItems at function start:", cartItems);

    useEffect(() => {
        console.log("count changed:", count);
        if (count >= 1 && cartItems[product?._id] > 1) {
            console.log("updating cart item quantity");
            updateCartItem(product?._id, count)
        }

    }, [count]);

    return product && (
        <div onClick={() => {
            navigate(`/products/${product.category.toLowerCase()
                }/${product._id}`); scrollTo(0, 0);
        }} className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full">
            <div className="group cursor-pointer flex items-center justify-center px-2">
                <img
                    className="group-hover:scale-105 transition max-w-26 md:max-w-36"
                    src={product?.images?.[0]}
                    alt={product?.name}
                />
            </div>
            <div className="text-gray-500/60 text-sm">
                <p>{product?.category}</p>
                {product?.inStock ?
                    <p className="text-gray-700 font-medium text-lg truncate w-full">{product?.name}</p>
                    :
                    <p className="text-gray-700 font-medium text-lg truncate w-full line-through">{product?.name}</p>
                }
                <div className="flex items-center gap-0.5">
                    {Array(5).fill('').map((_, i) => (
                        (
                            <img src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt="" className='md:w-3.5 w-3' key={i} />
                        )
                    ))}
                    <p>(4)</p>
                </div>
                <div className="flex items-end justify-between mt-3">
                    <p className="md:text-xl text-base font-medium text-primary">
                        {currency}${product?.offerPrice}{" "} <span className="text-gray-500/60 md:text-sm text-xs line-through">${product?.price}</span>
                    </p>
                    {product?.inStock ?
                        <div className="text-primary">
                            {
                                !cartItems[product?._id] ? (
                                    <button className="flex items-center justify-center gap-1 bg-primtext-primary-100 border border-primtext-primary-300 md:w-[80px] w-[64px] h-[34px] rounded text-primary-600 " onClick={() => {
                                        addToCart(product?._id)
                                        setCount((prev) => prev + 1)
                                    }} >
                                        <img src={assets.cart_icon} alt="cart" className='md:w-4 w-3' />
                                        Add
                                    </button>
                                ) : (

                                    <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded select-none">
                                        <button onClick={() => setCount((prev) => Math.max(prev - 1, 0))} className="cursor-pointer text-md px-2 h-full" >
                                            -
                                        </button>
                                        <span className="w-5 text-center">{cartItems[product?._id]}</span>
                                        <button onClick={() => setCount((prev) => prev + 1)} className="cursor-pointer text-md px-2 h-full" >
                                            +
                                        </button>
                                    </div>

                                )}
                        </div> :
                        <div>
                            <button className="w-full py-3.5 cursor-pointer font-medium text-sm bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition" >
                                Out of stock
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductCard;