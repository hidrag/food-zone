import { Link } from 'react-router-dom'

const ThankYou = () => {
	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-50 p-6'>
			<div className='bg-white shadow-xl rounded-xl p-8 text-center max-w-md w-full'>
				<h1 className='text-3xl font-bold text-green-600 mb-4'>
					Thank You!
				</h1>
				<p className='text-gray-700 mb-6'>
					Your order has been placed successfully. We’ll send you a
					confirmation email shortly.
				</p>
				<Link
					to='/'
					className='inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition duration-200'>
					Continue Shopping
				</Link>
			</div>
		</div>
	)
}

export default ThankYou
