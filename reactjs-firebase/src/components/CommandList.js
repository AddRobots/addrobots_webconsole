import React, {Component} from 'react';
import Message from './Command';
import _ from 'lodash';

class CommandList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: []
		};
		let app = this.props.firebase.database().ref('messages');
		app.on('value', snapshot => {
			this.getData(snapshot.val());
		});
	}

	getData(values) {
		let messagesVal = values;
		let messages = _(messagesVal)
			.keys()
			.map(messageKey => {
				let cloned = _.clone(messagesVal[messageKey]);
				cloned.key = messageKey;
				return cloned;
			})
			.value();
		this.setState({
			messages: messages
		});
	}

	render() {
		let messageNodes = this.state.messages.map((message) => {
			return (
				<div className="card">
					<div className="card-content">
						<Message message={message.message}/>
					</div>
				</div>
			)
		});
		return (
			<div>
				{messageNodes}
			</div>
		);
	}
}

export default CommandList