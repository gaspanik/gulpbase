var gulp = require('gulp')
,	gutil = require('gulp-util')
,	jade = require('gulp-jade') // change your favorite HTML template engine.
,	prettify = require('gulp-prettify')
,	less = require('gulp-less')
,	sass = require('gulp-ruby-sass')
,	prefix = require('gulp-autoprefixer')
,	minifycss = require('gulp-minify-css')
,	rename = require('gulp-rename')
,	imagemin = require('gulp-imagemin')
,	changed = require('gulp-changed')
,	connect = require('gulp-connect');

/*  Set your environment */

var paths = {
	"tplDir": "_templates/*.jade", // change your template extension.
	"lessDir": "_less/*.less",
	"scssDir": "_scss/*.scss",
	"imgDir": "_images/**",
	"rootDir": "dist",
	"cssDir": "dist/css",
	"imgsDir": "dist/images"
}

gulp.task('connect', connect.server({
	root: ['dist'],
	port: 1337,
	livereload: true,
	open: {
		"browser": "Duo" // {} set to blank, open default browser.
		}
	})
);

gulp.task('html', function() {
	return gulp.src(paths.tplDir)
		.pipe(jade()) // change your template engine's function name.
		.pipe(gulp.dest(paths.rootDir))
		// If you would like to prettify HTML, uncomment below 2 lines.
		// .pipe(prettify())
		// .pipe(gulp.dest(paths.rootDir))
		.pipe(connect.reload());
});

gulp.task('less', function() {
	return gulp.src(paths.lessDir)
		.pipe(less({
				sourceMap: true // If you don't need sourcemaps, set to false.
		}))
		.pipe(prefix('last 2 version'))
		.pipe(gulp.dest(paths.cssDir))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest(paths.cssDir))
		.pipe(connect.reload());
});

gulp.task('scss', function() {
	return gulp.src(paths.scssDir)
		// If you need sourcemaps, pls. rewrite below options to {style: 'expanded' , sourcemap: true} .
		// But you need to install sass 3.3 (gem install --pre sass)
		.pipe(sass({ style: 'expanded' }))
		.pipe(prefix('last 2 version'))
		.pipe(gulp.dest(paths.cssDir))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest(paths.cssDir))
		.pipe(connect.reload());
});

gulp.task('image', function() {
	return gulp.src(paths.imgDir)
		.pipe(changed(paths.imgsDir))
		.pipe(imagemin({optimizationLevel: 3})) // See gulp-imagemin page.
		.pipe(gulp.dest(paths.imgsDir));
});

// If you would like to use Sass/SCSS, uncomment 'less' to 'scss'.

gulp.task('watch', function() {
	gulp.watch([paths.tplDir], ['html']);
	gulp.watch([paths.lessDir], ['less']);
	// gulp.watch([paths.scssDir], ['scss']);
	gulp.watch([paths.imgDir], ['image']);
});

// If you would like to use Sass/SCSS, rewrite 'less' to 'scss'.

gulp.task('default', ['image', 'connect', 'less', 'html', 'watch']);
