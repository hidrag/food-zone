import { useEffect, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import axios from 'axios'
const useResData = (API_URL) => {
	const [allRestaurants, setAllRestaurants] = useState([])
	const [filteredRestaurants, setFilteredRestaurants] = useState([])

	// use useEffect for one time call getRestaurants using empty dependency array
	useEffect(() => {
		getRestaurants()
	}, [])

	// async function getRestaurant to fetch API data
	async function getRestaurants() {
		// handle the error using try... catch
		try {
			const response = await fetch(API_URL)
			// if response is not ok then throw new Error
			if (!response.ok) {
				const err = response.status
				throw new Error(err)
			} else {
				const json = await response.json()

				// initialize checkJsonData() function to check Swiggy Restaurant data
				function checkJsonData(jsonData) {
					for (let i = 0; i < jsonData?.data?.cards.length; i++) {
						// initialize checkData for Swiggy Restaurant data
						let checkData =
							json?.data?.cards[i]?.card?.card?.gridElements
								?.infoWithStyle?.restaurants

						// if checkData is not undefined then return it
						if (checkData !== undefined) {
							return checkData
						}
					}
				}

				// call the checkJsonData() function which return Swiggy Restaurant data
				const resData = checkJsonData(json)

				// update the state variable restaurants with Swiggy API data
				setAllRestaurants(resData)
				setFilteredRestaurants(resData)
			}
		} catch (error) {
			console.error(error) // show error in console
		}
	}
	return [allRestaurants, filteredRestaurants] // return allRestaurants & filteredRestaurants data
}

export default useResData

/* import { useEffect, useState } from 'react'
import axios from 'axios'

const useResData = (lat, lng) => {
	const [allRestaurants, setAllRestaurants] = useState([])
	const [filteredRestaurants, setFilteredRestaurants] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (!lat || !lng) return

		const fetchData = async () => {
			try {
				setLoading(true)
				const response = await axios.get('/api/restaurants', {
					params: {
						lat,
						lng,
						page_type: 'DESKTOP_WEB_LISTING',
					},
				})

				const cards = response.data?.data?.cards || []

				const restaurantCard = cards.find(
					(card) =>
						card.card?.card?.['@type'] ===
						'type.googleapis.com/swiggy.presentation.food.v2.RestaurantGridListing'
				)

				const restaurants =
					restaurantCard?.card?.card?.restaurants || []

				setAllRestaurants(restaurants)
				setFilteredRestaurants(null)
			} catch (error) {
				console.error('Failed to fetch restaurants:', error)
				setAllRestaurants([])
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [lat, lng])

	return [
		allRestaurants,
		filteredRestaurants,
		loading,
		setFilteredRestaurants,
	]
}

export default useResData
 */
