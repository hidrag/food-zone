import RestaurantCard from '../Components/RestaurantCard'
import { useState } from 'react'
import Shimmer from '../Components/Shimmer'
import { FOODFIRE_API_URL } from '../utils/constants'
import { Link } from 'react-router-dom'
import { filterData } from '../utils/Helper'
import useResData from '../Hooks/useResData'
import useOnline from '../Hooks/useOnline'
import UserOffline from '../Components/User'

const Body = () => {
	const [searchText, setSearchText] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [allRestaurants, FilterRes] = useResData(FOODFIRE_API_URL)
	const [filteredRestaurants, setFilteredRestaurants] = useState(null)
	const isOnline = useOnline()

	if (!isOnline) return <UserOffline />

	const searchData = (searchText, restaurants) => {
		if (searchText !== '') {
			const filteredData = filterData(searchText, restaurants)
			setFilteredRestaurants(filteredData)
			setErrorMessage('')
			if (filteredData?.length === 0) {
				setErrorMessage(`No results found for "${searchText}"`)
			}
		} else {
			setErrorMessage('')
			setFilteredRestaurants(restaurants)
		}
	}

	if (!allRestaurants) return null

	return (
		<div className='p-4'>
			<div className='max-w-4xl mx-auto mb-6 flex flex-col sm:flex-row items-center gap-4'>
				<input
					type='text'
					className='w-full sm:w-auto flex-1 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring focus:border-blue-400'
					placeholder='Search a restaurant you want...'
					value={searchText}
					onChange={(e) => {
						setSearchText(e.target.value)
						searchData(e.target.value, allRestaurants)
					}}
				/>
				<button
					className='bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 py-2 rounded-lg shadow'
					onClick={() => searchData(searchText, allRestaurants)}>
					Search
				</button>
			</div>

			{errorMessage && (
				<div className='text-center text-red-600 mb-4'>
					{errorMessage}
				</div>
			)}

			{allRestaurants?.length === 0 && FilterRes?.length === 0 ? (
				<Shimmer />
			) : (
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto'>
					{(filteredRestaurants === null
						? FilterRes
						: filteredRestaurants
					).map((restaurant) => (
						<Link
							to={`/restaurant/${restaurant?.info?.id}`}
							key={restaurant?.info?.id}>
							<RestaurantCard {...restaurant?.info} />
						</Link>
					))}
				</div>
			)}
		</div>
	)
}

export default Body
