const getUserLocation = () => {
	return new Promise((resolve) => {
		if (!navigator.geolocation) {
			resolve({ lat: 22.5726, lng: 88.3639 }) // default (Kolkata)
		} else {
			navigator.geolocation.getCurrentPosition(
				(pos) =>
					resolve({
						lat: pos.coords.latitude,
						lng: pos.coords.longitude,
					}),
				() => resolve({ lat: 22.5726, lng: 88.3639 }) // fallback
			)
		}
	})
}

export default getUserLocation
