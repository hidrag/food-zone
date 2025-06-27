import foodZoneLogo from '../assets/img/logo.jpg'
import { Link } from 'react-router-dom'
//import useOnline from '../Hooks/useOnline'
//import useAuth from '../Hooks/useAuth'
//import useLocalStorage from '../Hooks/useLocalStorage'
//import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

const Title = () => (
	<Link to='/'>
		<img
			src={foodZoneLogo}
			alt='Food Zone'
			title='Food Zone'
			className='w-14'
		/>
	</Link>
)

const Header = () => {
	//const navigate = useNavigate()
	//const [getLocalStorage, , clearLocalStorage] = useLocalStorage('user')
	//const [isLoggedin, setIsLoggedin] = useAuth()
	//const isOnline = useOnline()
	const { user, logout } = useAuth()

	/* useEffect(() => {
		if (getLocalStorage === null) {
			setIsLoggedin(false)
		}
	}, [getLocalStorage]) */

	return (
		<div className='w-full shadow-md bg-white'>
			<div className='flex justify-between items-center px-4 py-2'>
				<Title />
				{user && (
					<div className='user-name text-sm text-gray-700'>
						Welcome,{' '}
						<span className='font-semibold'>{user.name}</span>!
					</div>
				)}
				<ul className='flex gap-4 items-center text-sm font-medium'>
					<li>
						<Link
							to='/'
							className='text-blue-600 hover:text-blue-800 transition'>
							Home
						</Link>
					</li>
					<li>
						<Link
							to='/about'
							className='text-blue-600 hover:text-blue-800 transition'>
							About
						</Link>
					</li>
					<li>
						<Link
							to='/contact'
							className='text-blue-600 hover:text-blue-800 transition'>
							Contact
						</Link>
					</li>
					<li>
						<Link
							to='/cart'
							className='text-blue-600 hover:text-blue-800 text-lg'>
							<i className='fa-solid fa-cart-shopping'></i>
						</Link>
					</li>
					{user && (
						<li>
							<Link to='/orders'>Orders</Link>
						</li>
					)}
					<li>
						{/* {isLoggedin ? (
							<button
								onClick={() => {
									clearLocalStorage()
									setIsLoggedin(false)
								}}
								className='text-gray-800 font-semibold hover:text-red-600 flex items-center gap-1'>
								Logout
								<span
									className={`w-2 h-2 rounded-full ${
										isOnline ? 'bg-green-500' : 'bg-red-500'
									}`}></span>
							</button>
						) : (
							<button
								onClick={() => navigate('/login')}
								className='text-gray-800 font-semibold hover:text-green-600 flex items-center gap-1'>
								Login
								<span
									className={`w-2 h-2 rounded-full ${
										isOnline ? 'bg-green-500' : 'bg-red-500'
									}`}></span>
							</button>
						)} */}
						{user ? (
							<button onClick={logout}>Logout</button>
						) : (
							<Link to='/login'>Login</Link>
						)}
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Header
