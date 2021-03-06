var path = require( 'path' );
var webpack = require( 'webpack' );

module.exports = {
	cache: true,
	debug: true,
	devtool: 'cheap-module-source-map',
	//devtool: 'eval',
	entry: './app/src/app.js',
	output: {
		path: './app/build/',
		filename: 'app.min.js'
	},
	module: {
		loaders: [
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: [ 'es2015', 'react' ]
				}
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify( 'production' )
			}
		})
	]
};