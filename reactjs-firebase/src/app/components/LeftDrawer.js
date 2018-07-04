import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import {NavLink} from 'react-router-dom';
import {firebaseUtils} from '../../firebase/Firebase';

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
						<MenuItem onClick={firebaseUtils.login} disabled={firebaseUtils.isLoggedIn()}>
							Login
						</MenuItem>
						<MenuItem onClick={firebaseUtils.logout} disabled={!firebaseUtils.isLoggedIn()}>
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