import React, { useContext, useState } from 'react'; // <-- Import useState here
import { assets, categories } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const AddProducts = () => {

    const [files, setFiles] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [offerPrice, setOfferPrice] = useState('');

    // 1. New State for Loading 
    const [loading, setLoading] = useState(false);

    const { axios } = useContext(AppContext);

    const onSubmitHandler = async (e) => {
        // Prevent submission if already loading
        if (loading) return;

        try {
            e.preventDefault();
            setLoading(true); // 2. Set loading to true when submission starts

            const productData = {
                name,
                description: description.split('\n'),
                category,
                price,
                offerPrice
            };

            const formData = new FormData();
            formData.append('productData', JSON.stringify(productData));

            for (let i = 0; i < files.length; i++) {
                formData.append('images', files[i]);
            }

            const { data } = await axios.post('/api/product/add', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (data.success) {
                toast.success(data.message);
                setName('');
                setDescription('');
                setCategory('');
                setPrice('');
                setOfferPrice('');
                setFiles([]);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false); // 2. Reset loading to false when submission finishes
        }
    };

    return (
        <div className="no-scrollbar flex-1 h-screen overflow-y-scroll flex flex-col justify-between relative">
            {loading &&(
                <div className='w-full h-fit absolute bg-black/25 flex items-center justify-center'>
                    loading
                </div>
            )}
            <form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-5 max-w-lg">

                {/* ... other form fields (Image, Name, Description, Category, Price) ... */}

                <div>
                    <p className="text-base font-medium">Product Image</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        {Array(4).fill('').map((_, index) => (
                            <label key={index} htmlFor={`image${index}`}>

                                <input onChange={(e) => {
                                    const updatedFiles = [...files];
                                    updatedFiles[index] = e.target.files[0]
                                    setFiles(updatedFiles)
                                }}
                                    type="file" id={`image${index}`} hidden />

                                <img src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area} alt="" className='max-w-24 cursor-pointer' />

                            </label>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
                    <input onChange={(e) => setName(e.target.value)} value={name}
                        id="product-name" type="text" placeholder="Type here" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
                    <textarea onChange={(e) => setDescription(e.target.value)} value={description}
                        id="product-description" rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none" placeholder="Type here"></textarea>
                </div>
                <div className="w-full flex flex-col gap-1">
                    <label className="text-base font-medium" htmlFor="category">Category</label>
                    <select onChange={(e) => setCategory(e.target.value)} value={category}
                        id="category" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40">
                        <option value="">Select Category</option>
                        {categories.map((item, index) => (
                            <option key={index} value={item.path}>{item.path}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
                        <input onChange={(e) => setPrice(e.target.value)} value={price}
                            id="product-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
                        <input onChange={(e) => setOfferPrice(e.target.value)} value={offerPrice}
                            id="offer-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                </div>

                {/* 3. Update the Button */}
                <button
                    disabled={loading} // Disable the button while loading
                    className={`px-8 py-2.5 text-white font-medium rounded ${loading
                            ? 'bg-gray-400 cursor-not-allowed' // Use a gray background for disabled state
                            : 'bg-primary cursor-pointer' // Use primary background when active
                        }`}
                >
                    {loading ? 'Adding Product...' : 'ADD'}
                </button>
            </form>
        </div>
    );
};

export default AddProducts;