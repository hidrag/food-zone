const Footer = () => {
	const year = new Date().getFullYear()
	return (
		<footer className='fixed bottom-0 left-0 w-full bg-white border-t text-center py-4 text-gray-600 text-sm shadow-md z-50'>
			Created By
			<i className='fa-solid fa-heart mx-1 text-red-500'></i>
			<a
				href='https://www.linkedin.com/in/abhishekry/'
				target='_blank'
				rel='noopener noreferrer'
				className='text-blue-600 hover:underline mx-1'
				title="Abhishek Roy's Linkedin Profile">
				Abhishek Roy
			</a>
			<i className='fa-solid fa-copyright mx-1'></i>
			{year}
			<a
				href='https://github.com/hidrag/food-zone'
				target='_blank'
				rel='noopener noreferrer'
				className='font-bold ml-1 text-black hover:text-blue-600 transition'
				title='Food Zone Github Repository'>
				Food<span className='text-red-500'>Zone</span>
			</a>
		</footer>
	)
}

export default Footer
