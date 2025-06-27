import { Navigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import { toast } from 'react-toastify'
const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, loading } = useAuth()

	if (loading) {
		return <div className='text-center py-10'>Loading...</div>
	}

	if (!isAuthenticated) {
		toast.warn('Please log in / sign up to continue')
		return (
			<Navigate
				to='/login'
				replace
			/>
		)
	}

	return children
}

export default ProtectedRoute
