import React, { useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const AllProduct = () => {
    const { products,searchQuery } = React.useContext(AppContext);
    console.log("products in all product:", products);

    useEffect(() => {
        if (searchQuery.length > 0) {
            setFilterProducts(
                products.filter(product =>
                    product.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
            ); // <-- Corrected: closing parenthesis for setFilterProducts
        } else {
            // Optional: If searchQuery is empty, you might want to show all products
            setFilterProducts(products);
        }
    }, [products, searchQuery]);
    
    const [filterptoducts,setFilterProducts]=useState([]);
    return (
        <div className='mt-16 flex flex-col gap-6'>
            <div className='flex flex-col gap-2 items-end w-max'>
                <p className='text-2xl font-medium uppercase'>All products</p>
                <div className='w-16 h-0.5 bg-primary rounded-full'>
                </div>
            </div>

            <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-5'>
                {filterptoducts.map((products,index)=>(
                    <ProductCard key={index} product={products}/>

                ))}
            </div>
        </div>
    )
}


export default AllProduct