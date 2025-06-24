// Footer component for footer section
const Footer = () => {
	const year = new Date().getFullYear()
	return (
		<div className='footer'>
			Created By
			<i className='fa-solid fa-heart'></i>
			<a
				href='https://www.linkedin.com/in/abhishekry/'
				target='_blank'
				title="Abhishek Roy's Linkedin Profile">
				Abhishek Roy
			</a>
			<i className='fa-solid fa-copyright'></i>
			{year}
			<a
				href='https://github.com/hidrag/food-zone'
				target='_blank'
				title='Food Zone Github Repository'>
				<strong>
					Food<span>Zone</span>
				</strong>
			</a>
		</div>
	)
}

export default Footer
