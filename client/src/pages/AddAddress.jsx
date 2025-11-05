import React, { useContext, useEffect } from 'react'; // Don't need 'useState' here, it's imported in the component
import { assets } from '../assets/assets';
import { useState } from 'react'; // Keep this import for the AddAddress component
import toast from 'react-hot-toast';
import { AppContext } from '../context/AppContext';

// input field component
const InputField = ({ type, placeholder, name, handleChange, address }) => ( // Corrected prop name
  <input
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
    // Added basic Tailwind styling for the input field
    className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
  />
);

const AddAddress = () => { // Removed 'e' from here as it's not a prop

  const { axios, user, navigate } = useContext(AppContext);

  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
});

  const handleChange = (e) => { // Removed 'async' as it's not performing async operations here
    const { name, value } = e.target;

    setAddress((prevAddress) => ({
      ...prevAddress, // Corrected: Spread the previous state
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => { // Removed 'async' as it's not performing async operations here
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/address/add', { address });
      if (data.success) {
        toast.success(data.message)
        navigate('/cart')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(data.message)
    }
    console.log("Form submitted with address:", address);
    // Here you would typically send the address data to an API
  };
  useEffect(() => {
    if(!user){
      navigate('/cart')
    }

  }, [])
  return (
    <div className='mt-16 pb-16'>
      <p className='text-2xl md:text-3xl text-gray-500'>add shippping <span
        className='font-semibold text-primary'>address</span></p>
      <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
        <div className='flex-1 max-w-md'>
          <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm'>
            {/* Grouping first and last name inputs, and applying spacing to the groups */}
            <div className='flex gap-3'> {/* Use flexbox to place side-by-side with a gap */}
              <InputField handleChange={handleChange} address={address} name='firstName' type='text' placeholder="First Name" />
              <InputField handleChange={handleChange} address={address} name='lastName' type='text' placeholder="Last Name" />
            </div>
            <InputField handleChange={handleChange} address={address} name='email' type='email' placeholder="Email address" />
            <InputField handleChange={handleChange} address={address} name='street' type='text' placeholder="Street" />
            <div className='flex gap-3'>
              <InputField handleChange={handleChange} address={address} name='city' type='text' placeholder="City" />
              <InputField handleChange={handleChange} address={address} name='state' type='text' placeholder="State" />
            </div>
            <div className='flex gap-3'>
              <InputField handleChange={handleChange} address={address} name='zipcode' type='text' placeholder="Zip Code" />
              <InputField handleChange={handleChange} address={address} name='country' type='text' placeholder="Country" />
            </div>
            <InputField handleChange={handleChange} address={address} name='phone' type='text' placeholder="Phone" />
            <button type='submit'
              className='bg-primary text-white p-3 rounded-md w-full hover:bg-opacity-90 transition-all'>
              Submit Address
            </button>
          </form>
        </div>
        <div className="flex-1 hidden md:flex justify-center items-start">
          <img src={assets.add_address_iamge} alt="add address" className='max-w-xs md:max-w-sm lg:max-w-md' />
        </div>
      </div>
    </div>
  );
};

export default AddAddress;