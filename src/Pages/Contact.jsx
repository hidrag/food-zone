import { useState } from 'react'
import contactUs from '../assets/img/contactUs.png'

const Contact = () => {
	const [message, setMessage] = useState(false)

	const handleSubmit = (e) => {
		e.preventDefault()
		setMessage(true)
	}

	return (
		<div className='max-w-7xl mx-auto px-4 py-10 flex flex-col-reverse lg:flex-row items-center gap-10'>
			{/* Left Side Image */}
			<div className='w-full lg:w-1/2'>
				<img
					src={contactUs}
					alt='Contact us'
					className='w-full h-auto rounded-lg shadow-md'
				/>
			</div>

			{/* Right Side Form */}
			<div className='w-full lg:w-1/2 bg-white p-8 rounded-xl shadow-lg space-y-6'>
				<h1 className='text-3xl font-bold text-gray-800'>Contact Us</h1>
				<form
					onSubmit={handleSubmit}
					className='space-y-4'>
					<input
						type='text'
						placeholder='Name'
						required
						className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500'
					/>
					<input
						type='email'
						placeholder='Email'
						required
						className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500'
					/>
					<textarea
						placeholder='Type your message here...'
						required
						rows='5'
						className='w-full border border-gray-300 rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-green-500'></textarea>
					<button
						type='submit'
						className='w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition'>
						Submit
					</button>
					{message && (
						<p className='text-green-600 font-semibold'>
							Thanks for contacting{' '}
							<span className='font-bold'>FoodZone</span>, we will
							reply ASAP.
						</p>
					)}
				</form>
			</div>
		</div>
	)
}

export default Contact
