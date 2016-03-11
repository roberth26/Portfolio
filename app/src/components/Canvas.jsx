import React from 'react';
import ReactDOM from 'react-dom';

export default class Canvas extends React.Component {
	constructor( props ) {
		super( props );
		this.render_canvas = this.render_canvas.bind( this );
		this.state = {
			counter: null
		}
	}
	render_canvas() {
		this.setState({ counter: clearInterval( this.state.counter) });
		var node = ReactDOM.findDOMNode( this );
		var width = window.innerWidth;
		var height = window.innerHeight;

		node.width = width;
		node.height = height;

		var ctx = node.getContext( '2d' );
		var colors = [
			'#ffa77c',
			'#92c9e8',
			'#89e46d'
		]
		var delta_max = width <= 768 ? 10 : 20;
		var refresh = width <= 768 ? 350 : 500;

		var lines = [];

		//for ( var i = 0; i < Math.round( Math.random() * 5 ) + 1; i++ ) {
		for ( var i = 0; i < 5; i++ ) {
			lines.push({
				x: Math.round( Math.random( i ) * width ),
				y: Math.round( Math.random( i ) * height ),
				dx: Math.max( 1, Math.round( Math.random( i ) * delta_max ) - delta_max / 2 ),
				dy: Math.max( 1, Math.round( Math.random( i ) * delta_max ) - delta_max / 2 ),
				//color: colors[ Math.floor( Math.random( i ) * colors.length ) ],
				color: colors[ i % 4 ],
				//width: Math.max( 1, Math.round( Math.random( i ) * 5 ) )
				width: 1
			});
		}

		var count = 0;
		var counter = setInterval( function() {

			ctx.globalAlpha = Math.min( .1, .0004 * count );
			
			if ( count >= refresh ) {
				count = 0;
				ctx.clearRect( 0, 0, width, height );
				for ( var i = 0; i < lines.length; i++ ) {
					lines[ i ].x = Math.round( Math.random( i ) * width );
					lines[ i ].y = Math.round( Math.random( i ) * height );
					lines[ i ].dx = Math.max( 1, Math.round( Math.random( i ) * delta_max ) - delta_max / 2 );
					lines[ i ].dy = Math.max( 1, Math.round( Math.random( i ) * delta_max ) - delta_max / 2 );
				}
			}

			for ( var i = 0; i < lines.length; i++ ) {
				var line = lines[ i ];
				ctx.strokeStyle = line.color;

				ctx.lineWidth = line.width;
				ctx.lineTo( line.x, line.y );
				if ( count > 0 ) 
					ctx.stroke();
				ctx.beginPath();
				ctx.moveTo( line.x, line.y );

				line.x += line.dx;
				if ( line.x >= width ) {
					line.x = width;
					line.dx *= -1;
				} else if ( line.x <= 0 ) {
					line.x = 0;
					line.dx *= -1;
				}
				line.y += line.dy;
				if ( line.y >= height ) {
					line.y = height;
					line.dy *= -1;
				} else if ( line.y <= 0 ) {
					line.y = 0;
					line.dy *= -1;
				}

			}

			count++;

		}, parseInt( 1000 / 30 ));

		this.setState({
			counter: counter
		})
	}
	componentDidMount() {
		this.render_canvas();
		window.addEventListener( 'resize', this.render_canvas );
	}
	componentWillUnmount() {
		window.removeEventListener( 'resize', this.render_canvas );
	}
	render() {
		return (
			<canvas></canvas>
		);
	}
}