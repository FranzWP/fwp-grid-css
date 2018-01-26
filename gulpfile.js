var gulp                = require( 'gulp' );
var sass                = require( 'gulp-sass' );
var rename              = require( 'gulp-rename' );
var sourcemaps          = require( 'gulp-sourcemaps' );
var autoprefixer        = require( 'gulp-autoprefixer' );

var browserify          = require( 'browserify' );
var babelify            = require( 'babelify' );
var buffer              = require( 'vinyl-buffer' );
var source              = require( 'vinyl-source-stream' );

var styleSRC            = 'src/sass/style.scss';
var styleDIST           = 'dist/css/';
var styleWatch          = 'src/sass/**/*.scss';

var jsSRC               = 'script.js';
var jsDIST              = 'dist/js/';
var jsWatch             = 'src/js/**/*.js';
var jsFILE              = [ jsSRC ];
var jsFOLDER            = 'src/js/';


gulp.task('watch', ['default'], function()
{

    gulp.watch( styleWatch, ['style'] );
    gulp.watch( jsWatch, ['js'] );

});

gulp.task('default', ['style', 'js']);

gulp.task('style', function()
{

    gulp.src( styleSRC )
        .pipe( sourcemaps.init() )
        .pipe( sass( 
            {  

                outputStyle: 'expanded'

            }))
        .pipe( autoprefixer ( 
            {

                browsers: ['last 2 versions'],
                cascade: false

            }))
        .pipe( rename ( { suffix: '.min' } ) )
        .pipe( sourcemaps.write( './' ) )
        .pipe( gulp.dest( styleDIST ) );
        

});

gulp.task('js', function()
{

    jsFILE.map( function(entry)
    {

        return browserify( { entries: [ jsFOLDER + entry ] } )
        .transform( babelify, { presets: [ 'env' ] } )
        .bundle()

        .pipe( source( entry ) )
        .pipe( rename ( { suffix: '.min' } ) )
        .pipe( buffer() )
        .pipe( sourcemaps.init( { loadMaps: true } ) )
        .pipe( sourcemaps.write( './' ) )
        .pipe( gulp.dest( jsDIST ) )

    })

});