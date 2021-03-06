// Include gulp
var gulp = require('gulp');

// Include plugins
var replaceAssetPaths = require('gulp-html-replace');
var minifyHTML = require('gulp-htmlmin');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-clean-css');
var order = require('gulp-order');

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
	return gulp.src('src/js/*.js')
	.pipe(concat('main.js'))
	.pipe(rename({suffix: '.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});

// Concatenate and minify css
gulp.task('styles', function() {
	return gulp.src('src/css/*.css')
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