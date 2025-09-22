import React from 'react'
import { useParams } from 'react-router-dom';

const ProductCatgories = () => {
    const {products}=React.useContext(AppContext);
     const {categories}=useParams();
     console.log("products in best seller:", products);
     console.log("catagories in best seller:", catagories);
     const searchCategory=categories.find((item)=>item.path.toLowerCase()===category)
  return (
    <div>
        
    </div>
  )
}

export default ProductCatgories