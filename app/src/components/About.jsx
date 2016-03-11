import React from 'react';

export default class About extends React.Component {
	render() {
		return (
			<div className="page about">
				<div className="container">
					<h2 className="page__title">About Me</h2>
					<div className="about__content" dangerouslySetInnerHTML={{__html: this.props.about}} />
				</div>
			</div>
		);
	}
}