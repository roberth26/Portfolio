import React from 'react';
import { Link } from 'react-router';

import Icon from './Icon.jsx';

export default class NavDrawer extends React.Component {
	constructor( props ) {
		super( props );
		this.handle_click = this.handle_click.bind( this );
		this.render_social_menu = this.render_social_menu.bind( this );
	}
	handle_click( event ) {
		this.props.toggle_menu();
	}
	render_social_menu() {
		if ( this.props.social_menu ) {
			return (
				<ul className="social_menu">
					{this.props.social_menu.map( function( menu_item, index ) {
						return (
							<li className="social_menu__item" key={index}>
								<a className="social_menu__link"
									href={menu_item.url}
									dangerouslySetInnerHTML={{__html: menu_item.label}}
								/>
							</li>
						);
					})}
				</ul>
			);
		} else {
			return null;
		}
	}
	render() {
		return (
			<nav className="nav_drawer">
				<ul className="nav_menu">
					<li className="nav_menu__item">
						<Link className="nav_menu__item__link"
							activeClassName="nav_menu__item__link--current"
							onClick={this.handle_click} to={'/demo_reel'}
						><Icon icon="demo_reel" className="nav_menu__item__icon" />Demo Reel</Link>
					</li>
					<li className="nav_menu__item">
						<Link className="nav_menu__item__link"
							activeClassName="nav_menu__item__link--current"
							onClick={this.handle_click} to={'/portfolio'}
						><Icon icon="portfolio" className="nav_menu__item__icon" />Portfolio</Link>
					</li>
					<li className="nav_menu__item">
						<Link className="nav_menu__item__link"
							activeClassName="nav_menu__item__link--current"
							onClick={this.handle_click} to={'/about'}
						><Icon icon="about" className="nav_menu__item__icon" />About</Link>
					</li>
					<li className="nav_menu__item">
						<Link className="nav_menu__item__link"
							activeClassName="nav_menu__item__link--current"
							onClick={this.handle_click} to={'/contact'}
						><Icon icon="contact" className="nav_menu__item__icon" />Contact</Link>
					</li>
				</ul>
				{this.render_social_menu()}
			</nav>
		);
	}
}