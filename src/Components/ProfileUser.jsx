import { Component } from 'react'
import SocialProfileClass from './SocialProfile'

class ProfileUserClass extends Component {
	render() {
		const { name, html_url, avatar_url } = this.props.userInfo

		return (
			<div className='flex flex-col md:flex-row items-center justify-center gap-10 mt-8'>
				{/* About Me Card */}
				<div className='bg-white rounded-lg shadow-xl p-6 w-80 text-center'>
					<h2 className='text-xl font-semibold mb-4'>About Me</h2>
					<a
						href={html_url}
						target='_blank'
						rel='noopener noreferrer'>
						<img
							src={avatar_url}
							alt={name}
							className='w-32 h-32 rounded-full mx-auto shadow-md hover:scale-105 transition-transform duration-300'
							title={name}
						/>
					</a>
					<div className='mt-6'>
						<SocialProfileClass />
					</div>
				</div>
			</div>
		)
	}
}

export default ProfileUserClass
