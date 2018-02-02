import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import {MenuItem} from 'material-ui/Menu';
import {NavLink} from 'react-router-dom';
import {firebaseLogin} from '../../firebase/FirebaseLogin';

const styles = {
	list: {
		width: 250,
	},
	listFull: {
		width: 'auto',
	},
};

class LeftDrawer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			drawer: props.open,
			currentItem: ''
		};
		this.setDrawerOpen(props.open);
		this.setDrawerOpen = this.setDrawerOpen.bind(this);
	}

	setDrawerOpen = (open) => () => {
		this.setState({
			drawer: open
		});
	};

	componentWillReceiveProps = (nextProps) => {
		this.setState({
			drawer: nextProps.open
		});
	};

	componentDidMount() {
	}

	render() {
		const {classes} = this.props;

		return (
			<div>
				<Drawer open={this.state.drawer} onClose={this.setDrawerOpen(false)}>
					<div tabIndex={0} role='button' onClick={this.setDrawerOpen(false)} onKeyDown={this.setDrawerOpen(false)} className={classes.list}>
						<MenuItem onClick={this.setDrawerOpen(false)}>
							<NavLink to='/commands'>Commands</NavLink>
						</MenuItem>
						<MenuItem onClick={this.setDrawerOpen(false)}>
							<NavLink to='/controls'>Controls</NavLink>
						</MenuItem>
						<MenuItem onClick={firebaseLogin.login} disabled={firebaseLogin.isLoggedIn()}>
							Login
						</MenuItem>
						<MenuItem onClick={firebaseLogin.logout} disabled={!firebaseLogin.isLoggedIn()}>
							Logout
						</MenuItem>
					</div>
				</Drawer>
			</div>
		)
	}
}

LeftDrawer.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LeftDrawer);