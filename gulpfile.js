var gulp = require('gulp'),
  $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
  }),
  browserSync = require('browser-sync');

/*  Config for your environment */

var paths = {
  "tplDir": "_templates/*.jade", // change your template extension.
  "lessDir": "_less/*.less",
  "scssDir": "_scss/*.scss",
  "imgDir": "_images/**",
  "rootDir": "dist",
  "cssDir": "dist/css",
  "imgsDir": "dist/images"
}

gulp.task('bs', function() {
  browserSync.init(null, {
    server: {
      baseDir: paths.rootDir
    },
    notify: true,
    xip: false
  });
});

gulp.task('html', function() {
  return gulp.src(paths.tplDir)
    .pipe($.jade())
    .pipe(gulp.dest(paths.rootDir))
 // If you need prettify HTML, uncomment below 2 lines.
 // .pipe($.prettify())
 // .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('less', function() {
  return gulp.src(paths.lessDir)
    .pipe($.sourcemaps.init())
    .pipe($.less())
    .pipe($.autoprefixer('last 2 version'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(paths.cssDir))
    .pipe($.rename({
      suffix: '.min'
    }))
    .pipe($.csso())
    .pipe(gulp.dest(paths.cssDir))
    .pipe(browserSync.reload({
      stream: true,
      once: true
    }));
});

gulp.task('scss', function() {
  return gulp.src(paths.scssDir)
    .pipe($.rubySass({
      style: 'expanded',
      // sourcemap: true,
      // sourcemapPath: paths.scssDir
    }))
    .pipe($.autoprefixer('last 2 version'))
    .pipe(gulp.dest(paths.cssDir))
    .pipe($.rename({
      suffix: '.min'
    }))
    .pipe($.csso())
    .pipe(gulp.dest(paths.cssDir))
    .pipe(browserSync.reload({
      stream: true,
      once: true
    }));
});

gulp.task('image', function() {
  return gulp.src(paths.imgDir)
    .pipe($.changed(paths.imgsDir))
    .pipe($.imagemin({
      optimizationLevel: 3
    })) // See gulp-imagemin page.
  .pipe(gulp.dest(paths.imgsDir));
});

// If you would like to use Sass/SCSS, toggle 'less' to 'scss'.

gulp.task('watch', function() {
  gulp.watch([paths.tplDir], ['html']);
  gulp.watch([paths.lessDir], ['less']);
  // gulp.watch([paths.scssDir], ['scss']);
  gulp.watch([paths.imgDir], ['image']);
});

// If you would like to use Sass/SCSS, rewrite 'less' to 'scss'.

gulp.task('default', ['image', 'bs', 'less', 'html', 'watch']);