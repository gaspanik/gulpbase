# Gulpbase

Sample gulpfile.js for HTML template (default: Jade) and CSS preprocessors (less or scss, default: less).   
Auto-prefixer and Browser-Sync, Imagemin support.

## Usage

Install gulpjs and some dependencies.

	$ npm install

Run gulp.

	$ npm start

You would like to autoprefix specific browsers, open gulpfile.js and edit '.pipe(autoprefixer())' line.

> .pipe($.autoprefixer({ browsers: ['last 2 versions'] }))

to

> .pipe($.autoprefixer({ browsers: ['last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'] }))

## Chagelog 0.2.0

* Update dependencies and fixed some bugs.
