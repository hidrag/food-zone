import React from 'react'
import Header from './Components/Header'
import Body from './Pages/Home'
import Footer from './Components/Footer'
import About from './Pages/About'
import Error from './Components/Error'
import Contact from './Pages/Contact'
import Login from './Components/Login'
import RestaurantMenu from './Pages/RestaurantMenu'
import Profile from './Pages/Profile'
import Cart from './pages/Cart'
import Checkout from './Pages/Checkout'
import ThankYou from './Pages/ThankYou'
import { createBrowserRouter, Outlet } from 'react-router-dom' // for routing our page import createBrowserRouter and RouterProvider for providing router & Outlet for children component for nested routing

/* My Food App structure will look like this,
            1) Header
                - Logo
                - Nav Items(right side)
                - Cart
            2) Body
                - Search bar
                - Restaurants List
                    - Restaurant card
                        - Image
                        - Name
                        - Rating
            3) Footer
                - Links
                - Copyrights

*/

// AppLayout component to render: Header, Outlet(it contain children component like body, About, Restaurant Menu etc) and Footer Component
// Layout component
// eslint-disable-next-line react-refresh/only-export-components
const AppLayout = () => (
	<div className='app'>
		<div className='min-h-screen flex flex-col'>
			<Header />
			<main className='flex-grow'>
				<Outlet />
			</main>
			<Footer />
		</div>
	</div>
)

// Router configuration
const appRouter = createBrowserRouter([
	{
		path: '/',
		element: <AppLayout />,
		errorElement: <Error />,
		children: [
			{ path: '/', element: <Body /> },
			{
				path: 'about',
				element: <About />,
				children: [{ path: 'profile', element: <Profile /> }],
			},
			{ path: 'contact', element: <Contact /> },
			{ path: 'restaurant/:resId', element: <RestaurantMenu /> },
			{ path: 'cart', element: <Cart /> },
			{ path: '/checkout', element: <Checkout /> },
			{ path: '/thank-you', element: <ThankYou /> },
		],
	},
	{
		path: 'login',
		element: <Login />,
	},
])

export default appRouter
