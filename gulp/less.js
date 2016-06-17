/* LESS */
var gulp = require('gulp'),
    config = require('./config'),
    less = require('gulp-less'),
    lessReporter = require('gulp-less-reporter'), // Error reporter for gulp-less
    minifycss = require('gulp-minify-css'),
    cssshrink = require('gulp-cssshrink'),
    csscomb = require('gulp-csscomb'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    newer = require('gulp-newer'),
    gutil = require('gulp-util'),
    rename = require('gulp-rename'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    plumber = require('gulp-plumber');

gulp.task('less', function () {
    gulp.src(config.pathTo.Src.MainStyleFile)
        .pipe(plumber(function(error) {
            gutil.log(gutil.colors.red(error.message));
            this.emit('end');
        }))
        .pipe(newer(config.pathTo.Build.Styles))
        .pipe(sourcemaps.init())
        .pipe(less()).on('error', lessReporter)
        .pipe(autoprefixer(config.autoprefixerBrowsers))
        //.pipe(cssshrink())
        .pipe(csscomb())
        .pipe(gulp.dest(config.pathTo.Build.Styles))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.pathTo.Build.Styles))
        .pipe(reload({stream: true}));
});