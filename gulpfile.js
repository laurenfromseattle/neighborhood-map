// Include gulp
var gulp = require('gulp');

// Include plugins
var replaceAssetPaths = require('gulp-html-replace');
var minifyHTML = require('gulp-htmlmin');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-clean-css');

// Replace asset paths and minify HTML
gulp.task('html', function() {
	return gulp.src('src/index.html')
	.pipe(replaceAssetPaths({
		'css': 'css/main.min.css',
		'js': 'js/main.min.js'
	}))
	.pipe(minifyHTML({collapseWhitespace: true}))
	.pipe(gulp.dest('dist'));
});

// Concatenate and minify scripts
gulp.task('scripts', function() {
	return gulp.src(['src/js/knockout-3.4.0.js',
		'src/js/location.js',
		'src/js/locations.js',
		'src/js/app-view.js',
		'src/js/location-view.js',
		'src/js/view-model.js',
		'src/js/app.js'])
	.pipe(concat('main.js'))
	.pipe(rename({suffix: '.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});

// Concatenate and minify css
gulp.task('styles', function() {
	return gulp.src(['src/css/*.css'])
	.pipe(concat('main.css'))
	.pipe(rename({suffix: '.min'}))
	.pipe(minifyCSS())
	.pipe(gulp.dest('dist/css'));
});

// Watch files for changes
gulp.task('watch', function() {
	gulp.watch('src/index.html', ['html']);
	gulp.watch('src/js/*.js', ['scripts']);
	gulp.watch('src/css/*.css', ['styles']);
});

// Default task
gulp.task('default', ['html', 'scripts', 'styles']);