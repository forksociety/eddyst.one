var gulp   = require("gulp");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var sass   = require("gulp-sass");
var browserSync = require("browser-sync");

var config = {
    path: {
        build: "./build/",
        dist: "./dist/"
    }
}

config.buildPath = {
    js: config.path.build + "/js/*.js",
    scss: config.path.build + "/scss/*.scss"
}

// Init browser sync
gulp.task("browsersync", function(){
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

// Join and uglify all our JS files
gulp.task( "js", function() {
    gulp.src( config.buildPath.js )
        .pipe( concat("script.js") )
        .pipe( uglify() )
        .pipe( gulp.dest( config.path.dist ) )
        .pipe( browserSync.stream() );
});

// Minify our SCSS files
gulp.task( "sass", function() {
    gulp.src( config.buildPath.scss )
        .pipe( sass({
            outputStyle: "compressed"
        }) )
        .pipe( gulp.dest( config.path.dist ) )
        .pipe( browserSync.stream() );
});

// Watch files for changes
gulp.task( "watch", function() {
    gulp.watch( config.buildPath.js, ["js"] );
    gulp.watch( config.buildPath.scss, ["sass"] );
});

gulp.task( "default", ["js", "sass", "browsersync"], function(){
    gulp.start( "watch" );
});
