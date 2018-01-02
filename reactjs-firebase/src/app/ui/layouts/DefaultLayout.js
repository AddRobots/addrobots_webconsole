import React from 'react';

import Header from 'app/components/Header';

const DefaultLayout = (props) => {

	return (
		<div>
			<Header title="AddRobots Console"/>
			<div className="component--content">
				{props.children}
			</div>
		</div>
	)

}

export default DefaultLayout;