import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const ProductCatgories = () => {

    const {products}=useContext(AppContext);
     const {category}=useParams();


    //  console.log("products in categt:", products);
     console.log("catagories in best seller:", category);


    //  const searchCategory=category.find((item)=>item.path.toLowerCase()===category);
     const filteredProducts=products.filter((products)=>products.category.toLowerCase()===category);  


  return (
    <div className='mt-16'>
      {category && (
        <div className='flex flex-col items-end w-max'>
          <p className='text-2xl font-medium'>{category.toUpperCase()}</p>
          <div className='w-16 h-0.5 bg-primary rounded-full'>
          </div>
        </div>
      )}
      {filteredProducts.length > 0 ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
          {filteredProducts.map((products) => (
            <ProductCard key={products._id} product={products} />
          ))}
        </div>
      ) : (
        <div className='flex items-center justify-center h-[60vh]'>
          <p className='text-2xl font-medium text-primary'>No product found in this categary</p>

        </div>
      )}
    </div>
  )
}

export default ProductCatgories