import { Component } from 'react'
import ProfileUserClass from '../Components/ProfileUser'
import ProfileRepoClass from '../Components/ProfileRepo'
import { Github_API_User, Github_UserName, options } from '../utils/constants'

class Profile extends Component {
	constructor(props) {
		super(props)
		this.state = {
			userInfo: null,
			repoInfo: null,
		}
	}

	async componentDidMount() {
		try {
			const [userRes, repoRes] = await Promise.all([
				fetch(Github_API_User + Github_UserName, options),
				fetch(`${Github_API_User}${Github_UserName}/repos`, options),
			])
			const [userInfo, repoInfo] = await Promise.all([
				userRes.json(),
				repoRes.json(),
			])
			this.setState({ userInfo, repoInfo })
		} catch (error) {
			console.error('Error fetching GitHub data:', error)
		}
	}

	render() {
		const { userInfo, repoInfo } = this.state

		return (
			<>
				{userInfo && repoInfo && (
					<div className='flex flex-col md:flex-row justify-center items-start gap-8 p-6 mt-6'>
						{/* Profile Card */}
						<div className='w-full md:w-1/3'>
							<h1 className='text-2xl font-bold text-center mb-4'>
								About Me
							</h1>
							<ProfileUserClass userInfo={userInfo} />
						</div>

						{/* Repo Card */}
						<div className='w-full md:w-2/3'>
							<h1 className='text-2xl font-bold text-center mb-4'>
								Food
								<span className='text-orange-600'>
									Zone
								</span>{' '}
								App Github Repository
							</h1>
							<ProfileRepoClass
								userInfo={userInfo}
								repoInfo={repoInfo}
							/>
						</div>
					</div>
				)}
			</>
		)
	}
}

export default Profile
