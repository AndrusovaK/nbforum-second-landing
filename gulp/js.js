/* JavaScript */
var gulp = require('gulp'),
    config = require('./config'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    newer = require('gulp-newer'),
    gulpFilter = require('gulp-filter'),
    concat = require('gulp-concat'),
    gutil = require('gulp-util'),
    rename = require('gulp-rename'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    plumber = require('gulp-plumber');

gulp.task('js', function () {
    var customJS = gulpFilter(config.pathTo.Src.JSCustom, {restore: true}),
        vendorJS = gulpFilter(config.pathTo.Src.JSVendor, {restore: true});

    return gulp.src(config.pathTo.Src.JS)
        .pipe(plumber(function(error) {
            gutil.log(gutil.colors.red(error.message));
            this.emit('end');
        }))
        // Get custom JS
        .pipe(customJS)
        .pipe(sourcemaps.init())
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(gulp.dest(config.pathTo.Build.JSCustom))
        .pipe(concat('custom-bundle.js'))
        .pipe(gulp.dest(config.pathTo.Build.JSCustom))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.pathTo.Build.JSCustom))
        .pipe(customJS.restore)
        // Get vendor JS
        .pipe(vendorJS)
        .pipe(newer(config.pathTo.Build.JSVendor))
        .pipe(gulp.dest(config.pathTo.Build.JSVendor))
        .pipe(reload({stream: true}));
});
