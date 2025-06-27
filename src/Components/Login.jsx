import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext' // adjust path if needed

const Login = () => {
	const [isSignup, setIsSignup] = useState(false)
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const { login } = useAuth()

	const toggleMode = () => {
		setIsSignup((prev) => !prev)
		setError('')
		formik.resetForm()
	}

	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			name: isSignup
				? Yup.string().min(2, 'Too short').required('Required')
				: Yup.string(),
			email: Yup.string().email('Invalid email').required('Required'),
			password: Yup.string().min(6, 'Min 6 chars').required('Required'),
		}),
		onSubmit: async (values) => {
			setError('')
			setLoading(true)
			try {
				const endpoint = isSignup
					? '/api/auth/register'
					: '/api/auth/login'

				const payload = isSignup
					? values
					: { email: values.email, password: values.password }

				const { data } = await axios.post(endpoint, payload)
				login(data.token, data.user._id) // 👈 from AuthContext
				console.log('Login success:', data)
				navigate('/')

				//localStorage.setItem('userToken', data.token)
				//localStorage.setItem('userId', data.user._id)

				//navigate('/')
			} catch (err) {
				setError(err.response?.data?.message || 'Something went wrong')
			} finally {
				setLoading(false)
			}
		},
	})

	return (
		<div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
			<div className='max-w-md w-full bg-white shadow-md rounded-lg p-8'>
				<h2 className='text-2xl font-bold mb-6 text-center'>
					{isSignup ? 'Create Account' : 'Login to FoodZone'}
				</h2>

				<form
					onSubmit={formik.handleSubmit}
					className='space-y-4'>
					{isSignup && (
						<div>
							<label className='block mb-1 font-medium'>
								Name
							</label>
							<input
								type='text'
								name='name'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.name}
								className='w-full border px-3 py-2 rounded'
							/>
							{formik.touched.name && formik.errors.name && (
								<p className='text-red-500 text-sm'>
									{formik.errors.name}
								</p>
							)}
						</div>
					)}

					<div>
						<label className='block mb-1 font-medium'>Email</label>
						<input
							type='email'
							name='email'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.email}
							className='w-full border px-3 py-2 rounded'
						/>
						{formik.touched.email && formik.errors.email && (
							<p className='text-red-500 text-sm'>
								{formik.errors.email}
							</p>
						)}
					</div>

					<div>
						<label className='block mb-1 font-medium'>
							Password
						</label>
						<input
							type='password'
							name='password'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.password}
							className='w-full border px-3 py-2 rounded'
						/>
						{formik.touched.password && formik.errors.password && (
							<p className='text-red-500 text-sm'>
								{formik.errors.password}
							</p>
						)}
					</div>

					{error && <p className='text-red-500 text-sm'>{error}</p>}

					<button
						type='submit'
						disabled={loading}
						className='w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded'>
						{loading
							? 'Please wait...'
							: isSignup
							? 'Create Account'
							: 'Login'}
					</button>
				</form>

				<p className='text-sm text-center mt-4'>
					{isSignup
						? 'Already have an account?'
						: 'Don’t have an account?'}{' '}
					<button
						onClick={toggleMode}
						className='text-blue-600 hover:underline font-medium'>
						{isSignup ? 'Login' : 'Sign up'}
					</button>
				</p>
			</div>
		</div>
	)
}

export default Login
