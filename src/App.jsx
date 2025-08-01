import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import HomePage from './components/home/HomePage'
import NotFoundPage from './components/ui/NotFoundPage'
import ProductPage from './components/product/ProductPage'
import api from './api'
import CartPage from './components/cart/CartPage'
import CheckoutPage from './components/checkout/CheckoutPage'
import LoginPage from './components/user/LoginPage'
import ProtectedRoute from './components/ui/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import UserProfilePage from './components/user/UserProfilePage'
import PaymentStatusPage from './components/payment/PaymentStatusPage'
import RegisterPage from './components/user/RegisterPage'



const App = () => {

  const [numCartItems, setNumberCartItems] = useState(0);
  const cart_code = localStorage.getItem("cart_code")

  useEffect(function(){
    if(cart_code){
      api.get(`get_cart_stat?cart_code=${cart_code}`)
      .then(res => {
        console.log(res.data)
        setNumberCartItems(res.data.num_of_items)
      })

      .catch(err => {
        console.log(err.message)
      })
    }

  },[])
  return (
    <AuthProvider>
    <BrowserRouter>
    <Routes>

      <Route path='/' element={<MainLayout numCartItems={numCartItems}/>}>
      <Route index element={<HomePage/>}/>
      <Route path='products/:slug' element={<ProductPage setNumberCartItems={setNumberCartItems}/>} />
      <Route path='cart' element={<CartPage setNumberCartItems={setNumberCartItems}/>} />
      <Route path='checkout' element={
        <ProtectedRoute>
        <CheckoutPage/>
        </ProtectedRoute>} />
      <Route path='login' element={<LoginPage/>}/>
      <Route path='register' element={<RegisterPage/>}/>
      <Route path='/profile' element={<UserProfilePage/>}/>
      <Route path='*' element={<NotFoundPage/>}/>
      <Route path='/payment-status' element={<PaymentStatusPage setNumberCartItems={setNumberCartItems}/>}/>


      
      </Route>
    </Routes>
    
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App