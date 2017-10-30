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

gulp.task( 'js', function() {
    gulp.src( config.path.build + '/js/*.js' )
        .pipe( uglify() )
        .pipe(concat('script.js'))

// Minify our SCSS files
gulp.task( "sass", function() {
    gulp.src( config.path.build + "/scss/*.scss" )
        .pipe( sass({
            outputStyle: "compressed"
        }) )
        .pipe( gulp.dest( config.path.dist ) )
});
