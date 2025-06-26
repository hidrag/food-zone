import { createContext, useContext, useEffect, useReducer } from 'react'

// Create context
const CartContext = createContext()

// Reducer to manage cart actions
const cartReducer = (state, action) => {
	let updatedCart

	switch (action.type) {
		case 'ADD_ITEM':
			// eslint-disable-next-line no-case-declarations
			const existing = state.find((item) => item.id === action.payload.id)
			if (existing) {
				updatedCart = state.map((item) =>
					item.id === action.payload.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				)
			} else {
				updatedCart = [...state, { ...action.payload, quantity: 1 }]
			}
			return updatedCart

		case 'INCREMENT':
			return state.map((item) =>
				item.id === action.payload
					? { ...item, quantity: item.quantity + 1 }
					: item
			)

		case 'DECREMENT':
			return state
				.map((item) =>
					item.id === action.payload
						? { ...item, quantity: item.quantity - 1 }
						: item
				)
				.filter((item) => item.quantity > 0)

		case 'REMOVE_ITEM':
			return state.filter((item) => item.id !== action.payload)

		case 'CLEAR_CART':
			return []

		default:
			return state
	}
}

// Context provider
export const CartProvider = ({ children }) => {
	const [cart, dispatch] = useReducer(cartReducer, [], () => {
		const storedCart = localStorage.getItem('cart')
		return storedCart ? JSON.parse(storedCart) : []
	})

	// Save cart to localStorage on change
	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart))
	}, [cart])

	// Utility functions
	const addItem = (item) => dispatch({ type: 'ADD_ITEM', payload: item })
	const increment = (id) => dispatch({ type: 'INCREMENT', payload: id })
	const decrement = (id) => dispatch({ type: 'DECREMENT', payload: id })
	const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id })
	const clearCart = () => dispatch({ type: 'CLEAR_CART' })

	const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)
	const totalPrice = cart.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	)

	return (
		<CartContext.Provider
			value={{
				cart,
				addItem,
				increment,
				decrement,
				removeItem,
				clearCart,
				totalItems,
				totalPrice,
			}}>
			{children}
		</CartContext.Provider>
	)
}

// Hook for using cart context
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
	const context = useContext(CartContext)
	if (!context) throw new Error('useCart must be used within a CartProvider')
	return context
}
