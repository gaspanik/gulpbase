# Gulpbase

Sample gulpfile.js for HTML template (default: Jade) and CSS preprocessors (less or scss, default: less).   
Auto-prefixer and Live-reload, Imagemin support.

## Usage

Install gulp plugins.

	$ npm install

Run gulp.

	$ gulp

If you use local install gulpjs, Run "npm start".

	$ npm start

You would like to autoprefix specific browsers, open gulpfile.js and edit '.pipe(prefix())' line.

> .pipe(prefix('last 2 version'))

to

> .pipe(prefix('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
