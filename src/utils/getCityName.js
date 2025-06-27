const getCityName = async (lat, lng) => {
	try {
		const res = await fetch(
			`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
		)
		const data = await res.json()
		return (
			data.address.city ||
			data.address.town ||
			data.address.village ||
			data.address.state ||
			'Unknown Location'
		)
	} catch (err) {
		console.error('Failed to fetch city name:', err)
		return 'Unknown Location'
	}
}

export default getCityName
