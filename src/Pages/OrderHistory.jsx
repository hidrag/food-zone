import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../Context/AuthContext'

const OrderHistory = () => {
	const { token } = useAuth()
	const [orders, setOrders] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const res = await axios.get('/api/orders/my-orders', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				setOrders(res.data)
			} catch (err) {
				console.error('Failed to fetch order history', err)
			} finally {
				setLoading(false)
			}
		}

		if (token) fetchOrders()
	}, [token])

	if (loading)
		return <p className='text-center py-6'>Loading order history...</p>

	if (orders.length === 0)
		return <p className='text-center py-6'>No orders found.</p>

	return (
		<div className='max-w-4xl mx-auto p-4'>
			<h2 className='text-2xl font-bold mb-6'>Your Order History</h2>
			{orders.map((order) => (
				<div
					key={order._id}
					className='border rounded p-4 mb-4 shadow-sm bg-white'>
					<p className='text-gray-600 mb-1'>
						<b>Date:</b>{' '}
						{new Date(order.createdAt).toLocaleString()}
					</p>
					<p className='mb-2 text-gray-700'>
						<b>Total:</b> ₹{(order.totalAmount / 100).toFixed(2)}
					</p>

					<ul className='ml-4 list-disc'>
						{order.items.map((item) => (
							<li key={item.id}>
								{item.name} × {item.quantity} - ₹
								{(item.price / 100).toFixed(2)}
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	)
}

export default OrderHistory
