import React from 'react';
import { Link } from 'react-router';

export default class Logo extends React.Component {
	render() {
		return (
			<Link to={'/landing'}>
				<h2 className={this.props.className}>Robert<span className="bold">Hall</span></h2>
			</Link>
		);
	}
}