import React, { useState } from 'react'
import { useCart } from '../Context/CartContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from '../utils/axiosInstance'
import { useAuth } from '../Context/AuthContext'

const Checkout = () => {
	const { cart, totalItems, totalPrice, clearCart } = useCart()
	const navigate = useNavigate()
	const { user, token } = useAuth() // user._id should be available

	console.log('User from context:', user)
	useEffect(() => {
		if (cart.length === 0) {
			navigate('/cart')
		}
	}, [])

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		address: '',
	})

	const [loading, setLoading] = useState(false)
	const [paymentStatus, setPaymentStatus] = useState(null)

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	/* const handleSubmit = (e) => {
		e.preventDefault()

		if (
			!formData.name ||
			!formData.email ||
			!formData.phone ||
			!formData.address
		) {
			alert('Please fill in all fields')
			return
		}

		setLoading(true)
		setPaymentStatus('Processing Payment...')

		// Simulate payment processing delay
		setTimeout(() => {
			setPaymentStatus('Payment Successful ✅')
			clearCart()

			// Simulate redirect after success
			setTimeout(() => {
				navigate('/thank-you')
			}, 2000)
		}, 3000)
	} */

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (
			!formData.name ||
			!formData.email ||
			!formData.phone ||
			!formData.address
		) {
			alert('Please fill in all fields')
			return
		}

		setLoading(true)
		setPaymentStatus('Processing Payment...')

		/* try {
			// Simulate payment delay
			await new Promise((resolve) => setTimeout(resolve, 3000))

			// Prepare order data
			const orderData = {
				user: user._id, // must be sent
				items: cart.map((item) => ({
					id: item.id,
					name: item.name,
					price: item.price,
					quantity: item.quantity,
					imageId: item.imageId || '',
				})),
				totalAmount: totalPrice,
				location: formData.address, // or get from geolocation later
			}

			// Send order to backend
			const response = await axios.post(
				'http://localhost:5050/api/orders',
				orderData,
				{
					headers: {
						Authorization: `Bearer ${user.token}`, // if using token auth
					},
				}
			)

			setPaymentStatus('Payment Successful ✅')
			clearCart()

			// Store order ID or summary to localStorage or state before redirect
			localStorage.setItem('lastOrder', JSON.stringify(response.data))

			setTimeout(() => {
				navigate('/thank-you')
			}, 2000)
		} catch (error) {
			console.error('Order failed:', error)
			setPaymentStatus('Payment Failed ❌')
			setLoading(false)
		} */

		try {
			// Simulate payment delay
			setTimeout(async () => {
				const orderPayload = {
					user: user._id, // must be sent
					items: cart,
					totalAmount: totalPrice,
					location: formData.address,
				}

				const res = await axios.post('/orders', orderPayload, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})

				setPaymentStatus('Payment Successful ✅')
				clearCart()

				setTimeout(() => {
					navigate(`/thank-you?orderId=${res.data._id}`)
				}, 2000)
			}, 3000)
		} catch (error) {
			console.error('Order failed:', error)
			alert('Failed to place order.')
			setLoading(false)
		}
	}

	return (
		<div className='max-w-3xl mx-auto p-4'>
			<h2 className='text-2xl font-semibold mb-4'>Checkout</h2>

			<form
				onSubmit={handleSubmit}
				className='space-y-4 mb-6'>
				<input
					type='text'
					name='name'
					placeholder='Full Name'
					value={formData.name}
					onChange={handleChange}
					className='w-full p-2 border rounded'
				/>
				<input
					type='email'
					name='email'
					placeholder='Email Address'
					value={formData.email}
					onChange={handleChange}
					className='w-full p-2 border rounded'
				/>
				<input
					type='tel'
					name='phone'
					placeholder='Phone Number'
					value={formData.phone}
					onChange={handleChange}
					className='w-full p-2 border rounded'
				/>
				<textarea
					name='address'
					placeholder='Shipping Address'
					value={formData.address}
					onChange={handleChange}
					className='w-full p-2 border rounded'
				/>
				<button
					type='submit'
					className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'>
					Place Order
				</button>
			</form>

			{loading && (
				<div className='mt-4 p-4 bg-yellow-100 text-yellow-800 rounded shadow'>
					{paymentStatus}
				</div>
			)}

			<div className='border-t pt-4'>
				<h3 className='text-xl font-semibold mb-2'>Order Summary</h3>
				<p>Total Items: {totalItems}</p>
				<p>Total Price: ₹{totalPrice.toFixed(2)}</p>
			</div>
		</div>
	)
}

export default Checkout
