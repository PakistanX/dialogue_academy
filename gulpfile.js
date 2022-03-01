'use strict';
/*
  Gulp for running task.
  Gulp dart sass is a wrapper for sass.
*/
var gulp = require('gulp');
var sass = require('gulp-dart-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require("gulp-uglify-es").default;
var sourcemaps = require('gulp-sourcemaps');

/*
  Compile the scss files to main.min.css and main-rtl.min.css for development
*/
gulp.task('compile:sass-dev', function () {
  return gulp.src(
      [
          "assets/scss/style.scss"
      ]
  )
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("build/css"));
});

/*
  Compile and optimize the scss files to main.min.css and main-rtl.min.css for production
*/
gulp.task('compile:sass', function () {
    return gulp.src(
        [
            "assets/scss/style.scss"
        ]
    )
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest('build/css'));
});

/*
  Compile and optimize the js files to main.js and main.min.js
*/
gulp.task('compile:js', function () {
    return gulp.src(
        [
            'assets/js/edly-pagination-scripts.js',
            'assets/js/header.js',
        ]
    )
        .pipe(concat('main.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

/*
  Start a watch of all scss files and run run:sass
  if a change is detected.
*/
gulp.task('watch:sass',function() {
  gulp.watch('assets/scss/**/*.scss', gulp.series('compile:sass-dev'));
});

/*
  Start a watch of all js files and run run:js
  if a change is detected.
*/
gulp.task('watch:js',function() {
  gulp.watch('assets/js/*.js', gulp.series('compile:js'));
});

/*
  Start a watch of all scss and js files.
*/
gulp.task('watch', gulp.parallel('watch:sass', 'watch:js'))
