import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import toast from 'react-hot-toast';

const SellerLogin = () => {
    const { isSeller, setIsSeller, navigate, axios } = useContext(AppContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();
            const { data } = await axios.post('http://localhost:4000/api/seller/login', { email, password })
            if (data.success) {
                toast.success(data.message)
                setIsSeller(true)
                navigate('/seller')
            } else {
                toast.error(data.messsage)
            }
        } catch (error) {
            toast.error(data.messsage)
        }
    }

    useEffect(() => {
        if (isSeller) {
            navigate("/seller")
        }

    }, [isSeller])

    return !isSeller && (

        <form onSubmit={onSubmitHandler} className='min-h-screen flex items-center justify-center text-sm text-gray-600'>

            <div className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-80 rounded-lg shadow-xl border border-gray-200'>

                <p className='text-xl text-gray-600 font-semibold'>
                    <span className='text-primary'>seller</span> Login
                </p>
                <div className='w-full'>
                    <p>Email</p>
                    <input
                        type="email"
                        placeholder='enter your email'
                        className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input
                        type="password"
                        placeholder='enter your password'
                        className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className='bg-primary text-white w-full py-2 rounded-md cursor-pointer'>
                    Login
                </button>
            </div>
        </form>
    )
}

export default SellerLogin