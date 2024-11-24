import React, { useContext, useEffect } from 'react'
import { ShopContect } from '../context/ShopContect'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {

    const {navigate, token, setCartItem, backendUrl } = useContext(ShopContect)
    const [searchParams, setSearchParams] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async () => {

        try {
            
            if (!token) {
                return null
            } 

            const response = await axios.post(backendUrl + '/api/order/verifyStripe', {success, orderId}, {headers:{token}})

            if (response.data.success) {
                setCartItem({})
                navigate('/orders')
            } else {
                navigate('/cart')
            }

        } catch (error) {
            console.log(error);
            toast.error(error)
        }

    }

    useEffect(() => {
        verifyPayment()
    },[token])

  return (
    <div>
        
    </div>
  )
}

export default Verify