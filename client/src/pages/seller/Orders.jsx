import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets'; // No need for dummyOrders if fetching from API
import axios from 'axios'; // Import axios directly

import toast from 'react-hot-toast';

const Orders = () => {
    // Destructure currency and ensure axios is imported/provided correctly
    // If axios is provided via AppContext, keep it. Otherwise, import it directly as above.
    const { currency } = useContext(AppContext);
    // Initialize orders as an empty array to prevent the 'map' error on initial render
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state

    const fetchOrders = async () => {
        setLoading(true);
        setError(null); // Clear previous errors
        try {
            // Ensure the axios instance is correctly used here.
            // If you're using a global axios instance, `axios.get` is fine.
            // If it's coming from AppContext as `appAxios`, use that instead.
            const response = await axios.get('/api/order/seller');
            const data = response.data; // Access data from the response object

            if (data.success) {
                setOrders(data.orders);
            } else {
                toast.error(data.message);
                setError(data.message);
            }
        } catch (err) {
            // Check if it's an axios error with a response message
            if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message);
                setError(err.response.data.message);
            } else {
                // Generic error message for network issues or unexpected errors
                toast.error('Failed to fetch orders. Please try again.');
                setError('Failed to fetch orders.');
            }
            console.error("Error fetching orders:", err);
            setOrders([]); // Ensure orders is an empty array on error
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchOrders();
    }, []); // Empty dependency array means this runs once on mount

    if (loading) {
        return <div className='no-scrollbar flex-1 h-[96vh] overflow-y-scroll flex justify-center items-center'><p>Loading orders...</p></div>;
    }

    if (error) {
        return <div className='no-scrollbar flex-1 h-[96vh] overflow-y-scroll flex justify-center items-center'><p className="text-red-500">Error: {error}</p></div>;
    }

    if (orders?.length === 0) {
        return (
            <div className='no-scrollbar flex-1 h-[96vh] overflow-y-scroll'>
                <div className="md:p-10 p-4 space-y-4">
                    <h2 className="text-lg font-medium">Orders List</h2>
                    <p>No orders found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className='no-scrollbar flex-1 h-[96vh] overflow-y-scroll'>
            <div className="md:p-10 p-4 space-y-4">
                <h2 className="text-lg font-medium">Orders List</h2>
                {orders?.map((order, index) => (
                    <div key={order._id || index} className="flex flex-col md:grid justify-between md:flex-row md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300">
                        <div className="flex gap-5 max-w-80">
                            <img className="w-12 h-12 object-cover opacity-60" src={assets.box_icon} alt="boxIcon" />
                            <div>
                                {order?.items && order.items.map((item, itemIndex) => ( // Add check for order.items
                                    <div key={itemIndex} className="flex flex-col">
                                        <p className="font-medium">
                                            {item.product?.name}{" "} <span className={'text-primary'}>x {item.quantity}</span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="text-sm md:text-base text-black/60">
                            <p className='text-black/80'>
                                {order.address?.firstName} {order.address?.lastName}</p> {/* Add optional chaining */}

                            <p>{order.address?.street}, {order.address?.city},</p>
                            <p> {order.address?.state}, {order.address?.zipcode}, {order.address?.country}</p>
                            {/* Removed duplicate address field */}
                        </div>

                        <p className="font-medium text-base my-auto text-black/70">{currency}{order.amount}</p>

                        <div className="flex flex-col text-sm">
                            <p>Method: {order.paymentType}</p>
                            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                            <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
                        </div>
                        <button className="bg-primary text-white py-2 px-4 rounded-md">Track Order</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;