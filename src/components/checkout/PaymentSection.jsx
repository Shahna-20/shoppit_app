import React, { useState } from 'react'
import style from './PaymentSection.module.css'
import api from '../../api'

const PaymentSection = () => {

  const cart_code = localStorage.getItem("cart_code")
  const [loading, setLoading] = useState(false)

  function makePayment(){
    api.post("initiate_payment/", {cart_code})
    .then(res => {
      console.log(res.data)
      window.location.href = res.data.data.link
    })

    .catch(err => {
      console.log(err.message)
    })
  }

   function makePaypalPayment(){
    setLoading(true)
    api.post("initiate_paypal_payment/", {cart_code})
    .then(res => {
      console.log(res.data)
      setLoading(false)
      if(res.data.approval_url){
       window.location.href = res.data.approval_url
      }
    })

    .catch(err => {
      console.log('Error initiating payment:', err.message);
      setLoading(false)
    })
  }
  return (
    <div className='col-md-4'>
        <div className={`card ${style.card}`}>
            <div className='card-header' style={{backgroundColor:'#001F3F', color:'white'}}>
                 <h5>Payment Options</h5>
            </div>
            <div className='card-body'>
              {/* PayPal Button */}
              <button className={`btn btn-primary w-100 mb-3 ${style.paypalButton}`} onClick={makePaypalPayment} id='paypal-button'>
                  <i className='bi bi-paypal'></i> Pay with PayPal
              </button>

               {/* Flutterwave Button */}
              <button className={`btn btn-warning w-100 ${style.flutterwaveButton}`} onClick={makePayment} id='paypal-button'>
                  <i className='bi bi-credit-card'></i> Pay with Flutterwave
              </button>
            </div>
        </div>
    </div>
  )
}

export default PaymentSection