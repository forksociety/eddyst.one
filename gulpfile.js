var gulp = require('gulp');
var uglify = require("gulp-uglify");
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');

var config = {};
config.srcPath = './src/';
config.distPath = './dist/';

config.cssSrcPath = config.srcPath + 'css/*.css';
config.jsSrcPath = config.srcPath + 'js/*.js';

config.cssDistPath = config.distPath + 'css/';
config.jsDistPath = config.distPath + 'js/';

// CSS Minification 
gulp.task('css', () => {
  return gulp.src(config.cssSrcPath)
    .pipe(cleanCSS({compatibility: 'ie8', level: {1: {specialComments: 0}} }))
    .pipe(rename({
    	suffix: '.min'
    }))
    .pipe(gulp.dest(config.cssDistPath));
});

// JS Minification 
gulp.task('js', () => {
  return gulp.src(config.jsSrcPath)
    .pipe(uglify())
    .pipe(rename({
    	suffix: '.min'
    }))
    .pipe(gulp.dest(config.jsDistPath));
});

// gulp watch for css and js
gulp.task("watch", function() {
    gulp.watch(config.jsSrcPath, ["js"]);
    gulp.watch(config.cssSrcPath, ["css"]);
});

//gulp default
gulp.task('default',  ['css', 'js']);