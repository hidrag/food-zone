import React, { useState } from 'react'
import { useCart } from '../Context/CartContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Checkout = () => {
	const { cart, totalItems, totalPrice, clearCart } = useCart()
	const navigate = useNavigate()

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

	const handleSubmit = (e) => {
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
