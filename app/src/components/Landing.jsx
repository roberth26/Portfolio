import React from 'react';

import Nav from './Nav.jsx';
import Canvas from './Canvas.jsx';

export default class Landing extends React.Component {
	render() {
		return (
			<div className="landing">
				<Canvas />
				<div className="landing_contents">
					<h2 className="landing__title">What's up?</h2>
					<h3 className="landing__subtitle">I'm Robert.<br />I design and build cool shit.</h3>
					<Nav />
				</div>
			</div>
		);
	}
}