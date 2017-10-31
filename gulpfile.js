var gulp = require("gulp");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var sass = require("gulp-sass");

var config = {};
config.srcPath = "./src/";
config.distPath = "./dist/";
config.vendorPath = "./vendor/";

config.sassSrcPath = config.srcPath + "sass/*.scss";
config.jsSrcPath = config.srcPath + "js/*.js";

// JS files to concatenate
config.jsFilesToConcat = [
    // The order of files here *matters*
    config.vendorPath + "form.js",
    config.srcPath + "js/main.js"
];

// Minify our SCSS files
gulp.task("sass", () => {
    return gulp.src(config.sassSrcPath)
        .pipe(sass({
            outputStyle: "compressed"
        }))
        .pipe(gulp.dest(config.distPath));
});

// Join and uglify our JS files
gulp.task("js", () => {
    return gulp.src(config.jsFilesToConcat)
        .pipe(concat("script.js"))
        .pipe(uglify())
        .pipe(gulp.dest(config.distPath));
});

// Watch files for changes
gulp.task("watch", ["sass", "js"], () => {
    gulp.watch(config.jsSrcPath, ["js"]);
    gulp.watch(config.sassSrcPath, ["sass"]);
});

// Gulp default
gulp.task("default", ["sass", "js"]);
