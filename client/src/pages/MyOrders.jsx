import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { dummyOrders } from '../assets/assets';


const MyOrders = () => { // Removed 'e' as it's not a prop
    const [orders, setOrders] = useState([]); // Renamed state variable to 'orders'
    const { currency } = useContext(AppContext);

    const fetchMyOrders = async () => {
        // In a real application, you'd fetch data from an API here
        // For now, using dummyOrders
        setOrders(dummyOrders);
    };

    useEffect(() => {
        fetchMyOrders();
    }, []); // Empty dependency array means this runs once after the initial render

    return (
        <div className='mt-16 pb-16'>
            <div className='flex flex-col items-end w-max mb-8'>
                <p className='text-2xl font-medium uppercase'>my orders</p>
                <div className='w-16 h-0.5 bg-primary rounded-full'></div>
            </div>

            {/* Check if orders exist before mapping */}
            {orders.length === 0 ? (
                <p className='text-gray-600 text-center text-lg'>No orders found.</p>
            ) : (
                orders.map((order, orderIndex) => ( // Changed index to orderIndex for clarity
                    <div key={order._id || orderIndex} className='border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl mx-auto'>
                        {/* Order Header/Summary */}
                        <p className='flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col mb-4 border-b pb-3 border-gray-200'>
                            <span>Order ID: {order._id}</span>
                            <span>Payment: {order.paymentType}</span>
                            <span>Total Amount: {currency}{order.amount}</span>
                        </p>

                        {/* Order Items */}
                        {order.items.map((item, itemIndex) => ( // Changed index to itemIndex for clarity
                            <div key={item._id || itemIndex} className='flex items-center mb-4 last:mb-0 p-2 bg-white rounded-md shadow-sm border border-gray-100'>
                                {/* Product Image */}
                                <div className='bg-primary/10 p-2 rounded-lg mr-4'> {/* Reduced padding/margin a bit */}
                                    <img src={item.product.image[0]} alt={item.product.name} className='w-14 h-14 object-cover' /> {/* Added object-cover */}
                                </div>

                                {/* Product Details and Quantity */}
                                <div className='flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 items-center text-sm'>
                                    <div>
                                        <h2 className='text-lg font-medium text-gray-800'>{item.product.name}</h2>
                                        <p className='text-gray-500'>Category: {item.product.category}</p>
                                    </div>
                                    <p className='text-gray-600'>Quantity: {item.quantity || "1"}</p>
                                    <p className='text-gray-600'>Item Amount: {currency}{item.product.offerPrice * item.quantity}</p>
                                </div>
                            </div>
                        ))}

                        {/* Order Status and Date (placed outside the item map, as it pertains to the whole order) */}
                        <div className='pt-4 mt-4 border-t border-gray-200 text-sm flex justify-between items-center flex-wrap gap-2'>
                             <p className='text-gray-600'>Status: <span className='font-medium text-primary'>{order.status}</span></p>
                             <p className='text-gray-600'>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p> {/* Corrected createAt to createdAt */}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default MyOrders;