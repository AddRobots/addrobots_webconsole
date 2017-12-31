import React, {Component} from 'react';
import Logo from '../img/gear.png';

class Header extends Component {

	render() {
		return (
			<nav className="navbar">
				<div className="navbar-brand">
					<img
						src={Logo} alt="logo"
						role="presentation"
						width="32"
						height="32"
					/>
					<a className="navbar-item" href="http://bulma.io">
						{this.props.title}
					</a>
				</div>
			</nav>
		)
	}
}

export default Header