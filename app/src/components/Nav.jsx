import React from 'react';
import { Link } from 'react-router';

export default class Nav extends React.Component {
	render() {
		return (
			<nav className="nav">
				<ul className="nav_menu">
					<li className={ this.props.page == 'demo_reel' ? 'nav_menu__item nav_menu__item--current' : 'nav_menu__item'}>
						<Link className="nav_menu__item__link" activeClassName="nav_menu__item__link--active" to={'/demo_reel'}>Demo Reel</Link>
					</li>
					<li className={ this.props.page == 'portfolio' ? 'nav_menu__item nav_menu__item--current' : 'nav_menu__item'}>
						<Link className="nav_menu__item__link" activeClassName="nav_menu__item__link--active" to={'/portfolio'}>Portfolio</Link>
					</li>
					<li className={ this.props.page == 'about' ? 'nav_menu__item nav_menu__item--current' : 'nav_menu__item'}>
						<Link className="nav_menu__item__link" activeClassName="nav_menu__item__link--active" to={'/about'}>About</Link>
					</li>
					<li className={ this.props.page == 'contact' ? 'nav_menu__item nav_menu__item--current' : 'nav_menu__item'}>
						<Link className="nav_menu__item__link" activeClassName="nav_menu__item__link--active" to={'/contact'}>Contact</Link>
					</li>
				</ul>
			</nav>
		);
	}
}