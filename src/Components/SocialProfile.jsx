import { SiGmail, SiLinkedin, SiGithub, SiTwitter } from 'react-icons/si'
import {
	Github_Link,
	Email_Link,
	Linkedin_Link,
	Twitter_Link,
} from '../utils/constants'

const SocialProfile = () => {
	return (
		<div className='social-media-container'>
			<a
				href={Linkedin_Link}
				title='Follow me on Linkedin'
				className='icon-button linkedin'
				target='_blank'
				rel='noopener noreferrer'>
				<SiLinkedin />
			</a>
			<a
				href={Twitter_Link}
				title='Follow me on Twitter'
				className='icon-button twitter'
				target='_blank'
				rel='noopener noreferrer'>
				<SiTwitter />
			</a>
			<a
				href={Github_Link}
				title='Follow me on Github'
				className='icon-button github'
				target='_blank'
				rel='noopener noreferrer'>
				<SiGithub />
			</a>
			<a
				href={Email_Link}
				title='Any Query! Mail me'
				className='icon-button email'
				target='_blank'
				rel='noopener noreferrer'>
				<SiGmail />
			</a>
		</div>
	)
}

export default SocialProfile
