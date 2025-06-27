import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const ThankYou = () => {
	const [order, setOrder] = useState(null)
	const [loading, setLoading] = useState(true)
	const location = useLocation()

	// Extract orderId from query param
	const queryParams = new URLSearchParams(location.search)
	const orderId = queryParams.get('orderId')

	useEffect(() => {
		const fetchOrder = async () => {
			try {
				const token = localStorage.getItem('userToken')
				const res = await axios.get(`/api/orders/my-orders`, {
					headers: { Authorization: `Bearer ${token}` },
				})
				const foundOrder = res.data.find((o) => o._id === orderId)
				setOrder(foundOrder)
			} catch (err) {
				console.error('Failed to load order', err)
			} finally {
				setLoading(false)
			}
		}

		if (orderId) fetchOrder()
		else setLoading(false)
	}, [orderId])

	if (loading)
		return (
			<div className='p-10 text-center text-lg font-medium'>
				Loading order details...
			</div>
		)

	if (!order)
		return (
			<div className='p-10 text-center text-red-500 font-medium'>
				Order not found.
			</div>
		)

	return (
		<div className='max-w-2xl mx-auto p-6'>
			<h1 className='text-3xl font-bold text-green-600 mb-4'>
				Thank you for your order! 🎉
			</h1>
			<p className='mb-4 text-gray-600'>Order ID: {order._id}</p>

			<h2 className='text-xl font-semibold mb-2'>Items:</h2>
			<ul className='mb-4 space-y-2'>
				{order.items.map((item) => (
					<li
						key={item.id}
						className='flex justify-between border-b py-1'>
						<span>
							{item.name} × {item.quantity}
						</span>
						<span>₹{(item.price / 100).toFixed(2)}</span>
					</li>
				))}
			</ul>

			<div className='text-right font-semibold text-lg'>
				Total: ₹{(order.totalAmount / 100).toFixed(2)}
			</div>
		</div>
	)
}

export default ThankYou
