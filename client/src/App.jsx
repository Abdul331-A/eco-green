
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import toast, { Toaster } from 'react-hot-toast'

import Home from './pages/Home'
import Footer from './components/Footer'
import Login from './components/Login'
import { AppContext, AppContextProvider } from './context/AppContext'
import { useContext } from 'react'
import AllProduct from './pages/AllProduct'

const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller")
  // toast.success("Welcome to Green!")
const { showUserLogin } = useContext(AppContext);
  return (
    <div>
      {isSellerPath ? null : <Navbar />}

      {showUserLogin ? <Login /> : null}

      <Toaster />
      <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<AllProduct />} />
        </Routes>
      </div>
      {!isSellerPath && <Footer />}

    </div>
  )
}

export default App

