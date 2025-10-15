
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
// import Navbar from './components/Navbar'
import toast, { Toaster } from 'react-hot-toast'

import Home from './pages/Home'
import Footer from './components/Footer'
import Login from './components/Login'
import { AppContext, AppContextProvider } from './context/AppContext'
import { useContext } from 'react'
import AllProduct from './pages/AllProduct'
import ProductCatgories from './pages/ProductCatgories'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import AddAddress from './pages/AddAddress'
import MyOrders from './pages/MyOrders'
import Navbar from './components/Navbar'
import SellerLogin from './components/seller/SellerLogin'
import SellerLayout from './pages/seller/SellerLayout'
import AddProducts from './pages/seller/AddProducts'
import ProductList from './pages/seller/ProductList'
import Orders from './pages/seller/Orders'


const App = () => {

  const isSellerPath = useLocation().pathname.includes("seller")

  const { showUserLogin, isSeller } = useContext(AppContext);
  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
      {isSellerPath ? null : <Navbar />}

      {showUserLogin ? <Login /> : null}
      <Toaster />
      <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product' element={<AllProduct />} />
          <Route path='/products/:category' element={<ProductCatgories />} />
          <Route path='/products/:category/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/add-address' element={<AddAddress />} />
          <Route path='/my-orders' element={<MyOrders />} />
          <Route path='/seller' element={isSeller ? <SellerLayout /> : <SellerLogin />}>
            <Route index element={isSeller ? <AddProducts /> : null} />        
            <Route path='product-list' element={<ProductList />} />
            <Route path='orders' element={<Orders />} />
          </Route>
        </Routes>
      </div>
      {!isSellerPath && <Footer />}
    </div>
  )
}

export default App