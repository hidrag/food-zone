import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import burgerImage from '../assets/img/burgerImage.png'

const About = () => {
	const [show, setShow] = useState(false)

	return (
		<div className='w-full min-h-screen px-4 py-8 bg-white'>
			<div className='mb-6 text-center'>
				{show ? (
					<>
						<Link to='/about'>
							<button
								onClick={() => setShow(false)}
								className='bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md shadow-md transition'>
								Hide My Profile
							</button>
						</Link>
						<Outlet />
					</>
				) : (
					<Link to='profile'>
						<button
							onClick={() => setShow(true)}
							className='bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-md shadow-md transition'>
							Show My Profile
						</button>
					</Link>
				)}
			</div>

			<div className='flex flex-col-reverse md:flex-row justify-between items-center gap-8 max-w-6xl mx-auto'>
				<div className='md:w-1/2 text-center md:text-left'>
					<h1 className='text-4xl md:text-5xl font-bold leading-snug'>
						Welcome to <br /> The world of <br />
						<span className='text-yellow-500'>
							Tasty & Fresh Food
						</span>
					</h1>
					<h4 className='mt-4 text-lg font-medium'>
						"Better you will feel if you eat a{' '}
						<span className='text-red-500 font-semibold'>
							FoodZone
						</span>{' '}
						healthy meal"
					</h4>
				</div>

				<div className='md:w-1/2 flex justify-center'>
					<img
						src={burgerImage}
						alt='Food'
						className='w-64 md:w-96 h-auto object-contain'
					/>
				</div>
			</div>
		</div>
	)
}

export default About
