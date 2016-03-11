import React from 'react';

export default class MenuToggle extends React.Component {
	constructor( props ) {
		super( props );
		this.handle_click = this.handle_click.bind( this );
	}
	handle_click( event ) {
		event.preventDefault();
		this.props.toggle_menu();
	}
	render() {
		var className = this.props.menu_is_open ? 'menu_toggle menu_toggle--is_open' : 'menu_toggle';
		return (
			<a className={className} href="#" onClick={this.handle_click}>
				<div className="menu_toggle__content">
					<svg className="menu_toggle__icon" x="0px" y="0px" viewBox="0 0 36 36">
						<path d="M34,8H2C0.9,8,0,7.1,0,6v0c0-1.1,0.9-2,2-2h32c1.1,0,2,0.9,2,2v0C36,7.1,35.1,8,34,8z" />
						<path d="M34,20H2c-1.1,0-2-0.9-2-2v0c0-1.1,0.9-2,2-2h32c1.1,0,2,0.9,2,2v0C36,19.1,35.1,20,34,20z" />
						<path d="M34,32H2c-1.1,0-2-0.9-2-2v0c0-1.1,0.9-2,2-2h32c1.1,0,2,0.9,2,2v0C36,31.1,35.1,32,34,32z" />
					</svg>
					<svg className="menu_toggle__icon menu_toggle__closed_icon" x="0px" y="0px" viewBox="0 0 36 36">
						<path d="M34,0c-0.6,0-1.1,0.2-1.4,0.6c-2.8,2.8-29.2,29.2-32,32C0.2,32.9,0,33.4,0,34c0,1.1,0.9,2,2,2c0.6,0,1.1-0.2,1.4-0.6
							c2.8-2.8,29.2-29.2,32-32C35.8,3.1,36,2.6,36,2C36,0.9,35.1,0,34,0z" />
						<path d="M35.4,32.6c-2.8-2.8-29.2-29.2-32-32C3.1,0.2,2.6,0,2,0C0.9,0,0,0.9,0,2c0,0.6,0.2,1.1,0.6,1.4c2.8,2.8,29.2,29.2,32,32
							c0.4,0.4,0.9,0.6,1.4,0.6c1.1,0,2-0.9,2-2C36,33.4,35.8,32.9,35.4,32.6z" />
					</svg>
				</div>
			</a>
		);
	}
}