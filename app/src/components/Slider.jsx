import React from 'react';

export default class Slider extends React.Component {
	constructor( props ) {
		super( props );
		this.display_image = this.display_image.bind( this );
		this.state = {
			image: 0
		}
	}
	display_image( index ) {
		this.setState({
			image: index
		});
	}
	render() {
		return (
			<div className={this.props.className + " slider"}>
				<div className="slider__content">
					<div className="slider__viewport">
						<img className="slider__image" src={this.props.images[ this.state.image ].full} />
					</div>
					<div className="slider__pager">
						<ul className="slider__pager__list">
							{this.props.images.map( function( image, index ) {
								return (
									<li className={ index == this.state.image ? 'slider__pager__list__item slider__pager__list__item--active' : 'slider__pager__list__item' } key={index}>
										<img className="slider__pager__image"
											src={image.small}
											onClick={this.display_image.bind( this, index )}
										/>
									</li>
								);
							}.bind( this ))}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}