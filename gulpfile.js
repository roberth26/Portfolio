var gulp =         require( 'gulp' );
var uglify =       require( 'gulp-uglify' );
var sourcemaps =   require( 'gulp-sourcemaps' );
var sass =         require( 'gulp-sass' );
var concat =       require( 'gulp-concat' );
var autoprefixer = require( 'gulp-autoprefixer' );
var rename =       require( 'gulp-rename' );

gulp.task( 'sass', function() {
	return gulp.src( [ './sass/**/*.scss' ] )
		//.pipe( sourcemaps.init() )
			.pipe( sass({outputStyle: 'compressed'}).on( 'error', sass.logError ) )
			.pipe( autoprefixer() )
			.pipe( concat( 'style.min.css' ) )
		//.pipe( sourcemaps.write() )
		.pipe( gulp.dest( './css' ) );
});

gulp.task( 'sass_watch', function() {
	gulp.watch( [ './sass/**/*.scss' ], [ 'sass' ] );
});

gulp.task( 'default', [ 'sass', 'sass_watch' ] );