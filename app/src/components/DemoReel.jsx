import React from 'react';

export default class DemoReel extends React.Component {
	render() {
		if ( this.props.demo_reel ) {
			return (
				<div className="page demo_reel">
					<div className="container">
						<h2 className="page__title">Demo Reel</h2>
						<div className="embed">
							<div className="embed__wrapper">
								<iframe className="embed__item" src={this.props.demo_reel.url}></iframe>
							</div>
						</div>
					</div>
					<div className="demo_reel__content" dangerouslySetInnerHTML={{__html: this.props.demo_reel.description}} />
				</div>
			);
		} else {
			return null;
		}
	}
}