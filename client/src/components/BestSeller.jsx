import React from 'react'
import ProductCard from './ProductCard'
import { AppContext } from '../context/AppContext';

const BestSeller = () => {
    const {products}=React.useContext(AppContext);
    console.log("products in best seller:", products);
    
    return (
        <div className='mt-16'>
            <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
            <div>
                <ProductCard product={products[0]}/>
                
            </div>
        </div>
    )
}

export default BestSeller