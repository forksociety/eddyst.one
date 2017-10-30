var gulp   = require("gulp");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");

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
        .pipe( gulp.dest( config.path.dist ) )
});
