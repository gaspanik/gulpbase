var gulp = require('gulp')
,	jade = require('gulp-jade') // change your favorite HTML template engine. 
,	prettify = require('gulp-prettify')
,	less = require('gulp-less')
,	sass = require('gulp-ruby-sass')
,	prefix = require('gulp-autoprefixer')
,	minifycss = require('gulp-minify-css')
,	rename = require('gulp-rename')
,	connect = require('gulp-connect');

var paths = {
	"lessDir": "_less/*.less",
	"scssDir": "_scss/*.scss",
	"tplDir": "_templates/*.jade", // change your template extension.
	"cssDir": "dist/css",
	"destDir": "dist"
}

gulp.task('connect', connect.server({
	root: ['dist'],
	port: 1337,
	livereload: true,
	open: {} // Open default browser.
	})
);

gulp.task('html', function() {
	gulp.src(paths.tplDir)
	.pipe(jade()) // change your template engine's function.
	.pipe(gulp.dest(paths.destDir))
	// If you need prettify HTML, comment below 2 lines.
	// .pipe(prettify())
	// .pipe(gulp.dest(paths.destDir))
	.pipe(connect.reload());
});

gulp.task('less', function() {
	gulp.src(paths.lessDir)
	.pipe(less())
	.pipe(prefix('last 2 version'))
	.pipe(gulp.dest(paths.cssDir))
	.pipe(rename({suffix: '.min'}))
	.pipe(minifycss())
	.pipe(gulp.dest(paths.cssDir))
	.pipe(connect.reload());
});

gulp.task('scss', function() {
	gulp.src(paths.scssDir)
	.pipe(sass({ style: 'expanded' }))
	.pipe(prefix('last 2 version'))
	.pipe(gulp.dest(paths.cssDir))
	.pipe(rename({suffix: '.min'}))
	.pipe(minifycss())
	.pipe(gulp.dest(paths.cssDir))
	.pipe(connect.reload());
});

/*  If you would like to use Sass/SCSS, uncomment 'less' to 'scss'. */

gulp.task('watch', function() {
	gulp.watch([paths.tplDir], ['html']);
	gulp.watch([paths.lessDir], ['less']);
//	gulp.watch([paths.scssDir], ['scss']);
});

// If you would like to use Sass/SCSS, rewrite 'less' to 'scss'.

gulp.task('default', ['connect', 'html', 'less', 'watch']);
