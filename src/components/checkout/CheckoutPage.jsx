import React from 'react'
import OrderSummery from './OrderSummery'
import PaymentSection from './PaymentSection'
import useCartData from '../../hooks/useCartData'

const CheckoutPage = () => {

  const {cartitems, setCartItems, cartTotal, setCartTotal, loading, tax} = useCartData()
  return (
    <div className='container my-3'>
        <div className='row'>
               <OrderSummery cartitems={cartitems} cartTotal={cartTotal} tax={tax}/>
               <PaymentSection/>
        </div>
    </div>
  )
}

export default CheckoutPage