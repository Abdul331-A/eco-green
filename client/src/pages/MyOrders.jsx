import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

const MyOrders = () => {

  const [myOrders, setMyOrders] = useState([]);
  const { currency, axios, user } = useContext(AppContext);

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get('/api/order/user');
      if (data.success) {
        setMyOrders(data.order);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyOrders();
    }
  }, [user]);
console.log("listed or5ders",myOrders);

  return (
    <div className="mt-16 pb-16">
      <div className="flex flex-col items-end w-max mb-8">
        <p className="text-2xl font-medium uppercase">My Orders</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      {myOrders?.length === 0 ? (
        <p className="text-gray-600 text-center text-lg">No orders found.</p>
      ) : (
        myOrders.map((order, orderIndex) => (
          <div
            key={order._id || orderIndex}
            className="border border-gray-300 rounded-lg mb-10 p-5 max-w-4xl mx-auto"
          >
            {/* Order Header */}
            <p className="flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col mb-4 border-b pb-3 border-gray-200">
              <span>Order ID: {order._id || 'N/A'}</span>
              <span>Payment: {order.paymentType || 'N/A'}</span>
              <span>
                Total Amount: {currency}
                {order.amount || 0}
              </span>
            </p>

            {/* Order Items */}
            {order.items?.map((item, itemIndex) => (
              <div
                key={item._id || itemIndex}
                className="flex items-center mb-4 last:mb-0 p-2 bg-white rounded-md shadow-sm border border-gray-100"
              >
                {/* Product Image */}
                <div className="bg-primary/10 p-2 rounded-lg mr-4">
                  <img
                    src={item.product?.images?.[0]}
                    alt={item.product?.name || 'Product'}
                    className="w-14 h-14 object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 items-center text-sm">
                  <div>
                    <h2 className="text-lg font-medium text-gray-800">
                      {item.product?.name || 'Unknown Product'}
                    </h2>
                    <p className="text-gray-500">
                      Category: {item.product?.category || 'N/A'}
                    </p>
                  </div>
                  <p className="text-gray-600">Quantity: {item.quantity || 1}</p>
                  <p className="text-gray-600">
                    Item Amount: {currency}
                    {Number(item.product?.offerPrice || 0) *
                      Number(item.quantity || 1)}
                  </p>
                </div>
              </div>
            ))}

            {/* Order Status & Date */}
            <div className="pt-4 mt-4 border-t border-gray-200 text-sm flex justify-between items-center flex-wrap gap-2">
              <p className="text-gray-600">
                Status:{' '}
                <span className="font-medium text-primary">
                  {order.status || 'Pending'}
                </span>
              </p>
              <p className="text-gray-600">
                Order Date:{' '}
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString()
                  : 'N/A'}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
