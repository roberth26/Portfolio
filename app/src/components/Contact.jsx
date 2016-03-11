import React from 'react';
import 'whatwg-fetch';

export default class Contact extends React.Component {
	constructor( props ) {
		super( props );
		this.handle_submit = this.handle_submit.bind( this );
		this.handle_change = this.handle_change.bind( this );
		this.reset_form = this.reset_form.bind( this );
		this.get_intial_state = this.get_initial_state.bind( this );
		this.state = this.get_initial_state();
	}
	get_initial_state() {
		return {
			is_submitted: false,
			Name: {
				error: false,
				value: '',
				is_required: true,
				placeholder: 'Name*'
			},
			Email: {
				error: false,
				value: '',
				is_required: true,
				placeholder: 'Email*'
			},
			Subject: {
				error: false,
				value: '',
				is_required: false,
				placeholder: 'Subject'
			},
			Message: {
				error: false,
				value: '',
				is_required: true,
				placeholder: 'Message*'
			}
		};
	}
	handle_submit( e ) {
		e.preventDefault();
		var validated = true;
		for ( var key in this.refs ) {
			if ( this.refs.hasOwnProperty( key ) ) {
				if ( this.refs[ key ].required && this.refs[ key ].value == '' ) {
					validated = false;
				}
			}
		}		
		if ( validated ) {
			fetch( 'email.php', {
				method: 'post',
				body: JSON.stringify( this.state )
			}).then( function( response ) {
				return response.text();
			}).then( function( text ) {
				console.log( text );
				text = JSON.parse( text );
				if ( text.success != true ) {
					var new_state = Object.assign( {}, this.state );
					for ( var prop in text ) {
				        if ( text.hasOwnProperty( prop ) ) {
				        	window.scrollTo( 0, 0 );
				        	new_state[ prop ].value = '';
				        	new_state[ prop ].placeholder = text[ prop ];
				        	new_state[ prop ].error = true;
				        }
				    }
					this.setState( new_state );
				} else {
					this.setState({
						is_submitted: true
					});
				}
			}.bind( this ));
		} else {
			console.log( 'form not sent' );
		}
	}
	handle_change( e ) {
		e.preventDefault();
		let value = e.target.value;
		let name = e.target.getAttribute( 'name' );
		let is_required = e.target.required;
		let placeholder = e.target.placeholder;
		var new_state = Object.assign( {}, this.state );
		if ( new_state[ name ] ) {
			new_state[ name ].value = value;
			new_state[ name ].is_required = is_required;
			new_state[ name ].error = false;
			new_state[ name ].placeholder = name;
		}
		this.setState( new_state );
	}
	reset_form( e ) {
		e.preventDefault();
		this.setState( this.get_initial_state() );
	}
	render() {
		return (
			<div className="page contact">
				<div className="container">
					<div className={this.state.is_submitted ? 'form_wrapper is_submitted' : 'form_wrapper'}>
						<h2 className="page__title">Contact Me</h2>
						<form onSubmit={this.handle_submit}>
							<div className="row">
								<div className="col_6_desktop col_12_mobile">
									<input id="name"
										className={ ( this.state.Name && this.state.Name.error ) ? 'error' : '' }
										ref="name"
										type="text"
										name="Name" 
										onChange={this.handle_change}
										placeholder={this.state.Name ? this.state.Name.placeholder : 'Name*' } 
										value={ this.state.Name ? this.state.Name.value : '' }
										required />
								</div>
								<div className="col_6_desktop col_12_mobile">
									<input id="email"
										className={ ( this.state.Email && this.state.Email.error ) ? 'error' : '' }
										ref="email"
										type="email"
										name="Email"
										onChange={this.handle_change}
										placeholder={this.state.Email ? this.state.Email.placeholder : 'Email*' }
										value={ this.state.Email ? this.state.Email.value : '' }
										required />
								</div>
							</div>
							<input id="subject"
								className={ ( this.state.Subject && this.state.Subject.error ) ? 'error' : '' }
								ref="subject"
								type="text"
								name="Subject"
								onChange={this.handle_change}
								placeholder={this.state.Subject ? this.state.Subject.placeholder : 'Subject' }
								value={ this.state.Subject ? this.state.Subject.value : '' } />
							<textarea id="message"
								name="Message"
								className={ ( this.state.Message && this.state.Message.error ) ? 'error' : '' }
								ref="message"
								onChange={this.handle_change}
								required
								value={ this.state.Message ? this.state.Message.value : '' }
								placeholder={this.state.Message ? this.state.Message.placeholder : 'Message*'}>
							</textarea>
							<button type="submit"id="submit_btn">Submit</button>
						</form>
						<div className="form_submitted">
							<h3 className="form_submitted__title"><strong>Thank you</strong> for contacting me!</h3>
							<a className="form_submitted__reset_btn" href="#" onClick={this.reset_form}>Reset Form</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}