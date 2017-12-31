import React, {Component} from 'react';

class Command extends Component {

	render() {
		return (
			<div>
				{this.props.message}
			</div>
		)
	}
}

export default Command