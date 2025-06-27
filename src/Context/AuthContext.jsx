import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [token, setToken] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const storedToken = localStorage.getItem('userToken')
		const storedUserId = localStorage.getItem('userId')

		if (storedToken && storedUserId) {
			setToken(storedToken)
			axios.defaults.headers.common[
				'Authorization'
			] = `Bearer ${storedToken}`
			fetchUser(storedUserId, storedToken)
		} else {
			setLoading(false)
		}
	}, [])

	const fetchUser = async (id, token) => {
		try {
			const res = await axios.get(`/api/users/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			setUser(res.data)
		} catch (err) {
			console.error('Failed to fetch user:', err)
			//alert('Session expired. Please log in again.')
			logout()
		} finally {
			setLoading(false)
		}
	}

	const login = (token, userId) => {
		localStorage.setItem('userToken', token)
		localStorage.setItem('userId', userId)
		setToken(token)
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
		fetchUser(userId, token)
	}

	const register = async (formData) => {
		const res = await axios.post('/api/auth/register', formData)
		login(res.data.token, res.data.user._id)
	}

	const logout = () => {
		localStorage.removeItem('userToken')
		localStorage.removeItem('userId')
		setToken(null)
		setUser(null)
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				token,
				loading,
				login,
				logout,
				register,
				isAuthenticated: !!user,
			}}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
