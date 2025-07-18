import { Component } from 'react'
import SocialProfileClass from './SocialProfile'

class ProfileUserClass extends Component {
	constructor(props) {
		super(props)
		// console.log("ProfileUserClass child constructor");
	}

	componentDidMount() {
		// console.log("ProfileUserClass child componentDidMount");
	}
	componentDidUpdate() {
		// console.log("ProfileUserClass child componentDidUpdate");
	}
	componentWillUnmount() {
		// console.log("ProfileUserClass child componentWillUnmount");
	}
	render() {
		const { name, html_url, avatar_url, bio } = this.props.userInfo // accessing userInfo as props from parent class `ProfileClass`
		// console.log("ProfileUserClass child render");

		return (
			<div className='profile-user-card'>
				<a
					href={html_url}
					target='_blank'
					rel='noopener noreferrer'>
					<img
						className='profile-user-img'
						src={avatar_url}
						alt={name}
						title={name}
					/>
				</a>
				<p className='profile-user-bio'>{bio}</p>
				<SocialProfileClass />
			</div>
		)
	}
}

export default ProfileUserClass
