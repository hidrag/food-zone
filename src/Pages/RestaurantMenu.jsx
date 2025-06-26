import { useParams } from 'react-router-dom'
import {
	FOODFIRE_MENU_API_URL,
	IMG_CDN_URL,
	ITEM_IMG_CDN_URL,
	MENU_ITEM_TYPE_KEY,
	RESTAURANT_TYPE_KEY,
} from '../utils/constants'
import Shimmer from '../Components/Shimmer'
import useResMenuData from '../Hooks/useResMenuData'
import useOnline from '../Hooks/useOnline'
import UserOffline from '../Components/User'
import { useCart } from '../Context/CartContext'

const RestaurantMenu = () => {
	const { resId } = useParams()
	const [restaurant, menuItems] = useResMenuData(
		FOODFIRE_MENU_API_URL,
		resId,
		RESTAURANT_TYPE_KEY,
		MENU_ITEM_TYPE_KEY
	)

	const isOnline = useOnline()
	const { cart, addItem, increment, decrement } = useCart()

	const getQuantity = (id) => {
		const item = cart.find((i) => i.id === id)
		return item ? item.quantity : 0
	}

	if (!isOnline) return <UserOffline />
	if (!restaurant) return <Shimmer />

	return (
		<div className='max-w-6xl mx-auto px-4 py-10'>
			{/* Restaurant Header */}
			<div className='flex flex-col md:flex-row items-start gap-6 mb-10 border-b pb-8'>
				<img
					className='w-full md:w-64 h-48 rounded-lg object-cover shadow'
					src={IMG_CDN_URL + restaurant?.cloudinaryImageId}
					alt={restaurant?.name}
				/>
				<div>
					<h2 className='text-3xl font-bold text-gray-800 mb-2'>
						{restaurant?.name}
					</h2>
					<p className='text-gray-600 mb-2'>
						{restaurant?.cuisines?.join(', ')}
					</p>
					<div className='flex items-center space-x-3 text-sm text-gray-700'>
						<span
							className={`px-2 py-1 rounded font-semibold flex items-center space-x-1 ${
								restaurant?.avgRating < 4
									? 'bg-red-100 text-red-600'
									: restaurant?.avgRating === '--'
									? 'bg-gray-100 text-gray-800'
									: 'bg-green-600 text-white'
							}`}>
							<i className='fa-solid fa-star'></i>
							<span>{restaurant?.avgRating}</span>
						</span>
						<span>|</span>
						<span>{restaurant?.sla?.slaString}</span>
						<span>|</span>
						<span>{restaurant?.costForTwoMessage}</span>
					</div>
				</div>
			</div>

			{/* Menu Section */}
			<div>
				<div className='mb-6'>
					<h3 className='text-2xl font-semibold text-gray-800'>
						Recommended
					</h3>
					<p className='text-gray-500'>{menuItems.length} ITEMS</p>
				</div>

				<div className='grid gap-6'>
					{menuItems.map((item) => {
						const qty = getQuantity(item.id)
						return (
							<div
								key={item?.id}
								className='flex flex-col md:flex-row items-start justify-between border p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition-all'>
								<div className='flex-1'>
									<h4 className='text-lg font-semibold text-gray-900'>
										{item?.name}
									</h4>
									<p className='text-green-600 font-medium mt-1'>
										{item?.price > 0
											? new Intl.NumberFormat('en-IN', {
													style: 'currency',
													currency: 'INR',
											  }).format(item?.price / 100)
											: ''}
									</p>
									<p className='text-sm text-gray-600 mt-1'>
										{item?.description}
									</p>
								</div>

								<div className='mt-4 md:mt-0 md:ml-6 text-center'>
									{item?.imageId && (
										<img
											src={
												ITEM_IMG_CDN_URL + item?.imageId
											}
											alt={item?.name}
											className='w-32 h-24 object-cover rounded-md mb-2 mx-auto'
										/>
									)}

									{qty > 0 ? (
										<div className='flex items-center justify-center space-x-2'>
											<button
												className='px-2 py-1 border rounded text-red-600 hover:bg-red-100'
												onClick={() =>
													decrement(item.id)
												}>
												-
											</button>
											<span className='text-lg font-semibold'>
												{qty}
											</span>
											<button
												className='px-2 py-1 border rounded text-green-600 hover:bg-green-100'
												onClick={() =>
													increment(item.id)
												}>
												+
											</button>
										</div>
									) : (
										<button
											className='mt-2 px-4 py-1 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700'
											onClick={() => addItem(item)}>
											ADD +
										</button>
									)}
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default RestaurantMenu
