import React from 'react'
import ProductCard from './ProductCard'
import { AppContext } from '../context/AppContext';

const BestSeller = () => {
    const {products}=React.useContext(AppContext);
    console.log("products in best seller:", products);

    
    return (
        <div className='mt-16'>
            <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
            <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                {products.filter((products)=>products.inStock).slice(0,5).map((product,index)=>(
                    <ProductCard key={index} product={product}/>         
                ))}
            </div>
        </div>
    )
}

export default BestSeller