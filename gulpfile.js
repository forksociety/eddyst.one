var gulp   = require("gulp");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var sass   = require("gulp-sass");

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

// Join and uglify all our JS files
gulp.task( "js", function() {
    gulp.src( config.buildPath.js )
        .pipe( concat("script.js") )
        .pipe( uglify() )
        .pipe( gulp.dest( config.path.dist ) )
});

// Minify our SCSS files
gulp.task( "sass", function() {
    gulp.src( config.buildPath.scss )
        .pipe( sass({
            outputStyle: "compressed"
        }) )
        .pipe( gulp.dest( config.path.dist ) )
});
