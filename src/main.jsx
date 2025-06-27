import React from 'react'
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { RouterProvider } from 'react-router-dom'
import { CartProvider } from './Context/CartContext'
import appRouter from './app.jsx' // ✅ make sure this path is correct
import { AuthProvider } from './Context/AuthContext'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
	<React.StrictMode>
		<AuthProvider>
			<CartProvider>
				{/* Wrapping the RouterProvider with CartProvider to provide cart context to all components */}
				<RouterProvider router={appRouter} />
			</CartProvider>
		</AuthProvider>
	</React.StrictMode>
)
