import React from 'react';

export default class About extends React.Component {
	render() {
		return (
			<div className="page about">
				<div className="container">
					<div className="about__content">
						<h2 className="page__title">About Me</h2>
						<div dangerouslySetInnerHTML={{__html: this.props.about}} />
					</div>
				</div>
			</div>
		);
	}
}