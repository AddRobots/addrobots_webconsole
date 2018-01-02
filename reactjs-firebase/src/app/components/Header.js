import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import LeftDrawer from './LeftDrawer';
import {withRouter} from 'react-router-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import CommandPage from 'app/ui/pages/CommandPage';
import ControlsPage from 'app/ui/pages/ControlsPage';

class Header extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			drawer: false,
		};
		this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
		this.handleDrawerChange = this.handleDrawerChange.bind(this);
	}

	// when the drawer is toggled.
	handleDrawerToggle = () => {
		this.setState({drawer: !this.state.drawer});
	}

	// this will handle closing the drawer from the drawer component itself.
	handleDrawerChange = (status) => {
		this.setState({drawer: status});
	}

	componentWillReceiveProps = (nextProps) => {
		this.setState({
			drawer: nextProps.open
		});
	};

	// render the component
	render() {
		const {classes} = this.props;
		return (
			<div className="component--appbar">
				<AppBar
					title={this.props.title || 'AddRobots'}>
					<Toolbar>
						<IconButton className={classes.menuButton} color="contrast" aria-label="Menu" onClick={this.handleDrawerToggle}>
							<MenuIcon/>
						</IconButton>
						<Typography type="title" color="inherit" className={classes.flex}>
							{this.props.title || 'AddRobots'}
						</Typography>
					</Toolbar>
				</AppBar>
				<Route exact path="/" component={CommandPage}/>
				<Switch>
					<Route exact path="/commands" component={CommandPage}/>
					<Route exact path="/controls" component={ControlsPage}/>
				</Switch>
				<LeftDrawer open={this.state.drawer} onClick={this.handleDrawerChange}/>
			</div>
		)
	}
}

Header.propTypes = {
	classes: PropTypes.object.isRequired,
};

const styles = {
	root: {
		width: '100%',
	},
	flex: {
		flex: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
};

export default withStyles(styles)(withRouter(Header));