import { useCart } from '../Context/CartContext'
import { Link, useNavigate } from 'react-router-dom'

const Cart = () => {
	const { cart, removeItem, updateQuantity, clearCart } = useCart()

	const navigate = useNavigate()

	const handleCheckout = () => {
		if (cart.length === 0) return
		navigate('/checkout')
	}

	const subtotal = cart.reduce(
		(acc, item) => acc + ((item.price ?? 0) / 100) * item.quantity,
		0
	)

	if (cart.length === 0) {
		return (
			<div className='text-center py-20'>
				<h2 className='text-2xl font-bold mb-4'>
					Your cart is empty 🛒
				</h2>
				<Link
					to='/'
					className='text-blue-600 hover:underline text-lg'>
					Go back to menu
				</Link>
			</div>
		)
	}

	return (
		<div className='max-w-4xl mx-auto px-4 py-8'>
			<h1 className='text-3xl font-bold mb-6 text-center'>Your Cart</h1>

			<div className='space-y-6'>
				{cart.map((item) => (
					<div
						key={item.id}
						className='flex flex-col sm:flex-row justify-between items-center border p-4 rounded-xl shadow-md gap-4'>
						<div className='flex items-center gap-4 w-full sm:w-auto'>
							{item.imageId && (
								<img
									src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`}
									alt={item.name}
									className='w-20 h-20 object-cover rounded'
								/>
							)}
							<div>
								<h3 className='font-semibold text-lg'>
									{item.name}
								</h3>
								<p className='text-gray-600 text-sm'>
									₹{(item.price ?? 0) / 100} × {item.quantity}
								</p>
							</div>
						</div>

						<div className='flex items-center gap-3'>
							<button
								onClick={() =>
									updateQuantity(item.id, item.quantity - 1)
								}
								className='px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-lg'>
								–
							</button>
							<span className='font-medium text-lg'>
								{item.quantity}
							</span>
							<button
								onClick={() =>
									updateQuantity(item.id, item.quantity + 1)
								}
								className='px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-lg'>
								+
							</button>

							<button
								onClick={() => removeItem(item.id)}
								className='ml-4 text-red-500 text-sm hover:underline'>
								Remove
							</button>
						</div>
					</div>
				))}
			</div>

			{/* Subtotal and Action Buttons */}
			<div className='mt-10 border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-4'>
				<h2 className='text-2xl font-semibold text-gray-800'>
					Subtotal: ₹{subtotal.toFixed(2)}
				</h2>
				<div className='flex gap-3'>
					<button
						onClick={clearCart}
						className='px-5 py-2 border border-gray-400 rounded hover:bg-gray-100 text-gray-700'>
						Clear Cart
					</button>
					<button
						onClick={handleCheckout}
						className='px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700'>
						Checkout
					</button>
				</div>
			</div>
		</div>
	)
}

export default Cart
