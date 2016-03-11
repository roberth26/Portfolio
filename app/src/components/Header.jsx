import React from 'react';
import { Link } from 'react-router';

import Logo from './Logo.jsx';
import Nav from './Nav.jsx';
import MenuToggle from './MenuToggle.jsx';

export default class Header extends React.Component {
	render() {
		return (
			<header className="header">
				<MenuToggle toggle_menu={this.props.toggle_menu} menu_is_open={this.props.menu_is_open} />
				<Logo className="header__logo" />
				<Nav />
			</header>
		);
	}
}