/* GitHub Pages */
var gulp = require('gulp'),
    config = require('./config'),
    plumber = require('gulp-plumber'),
    gutil = require('gulp-util'),
    ghPages = require('gulp-gh-pages');

gulp.task('gh-pages', function() {
    return gulp.src(config.pathTo.Src.GHPages)
        .pipe(plumber(function(error) {
            gutil.log(gutil.colors.red(error.message));
            this.emit('end');
        }))
        .pipe(ghPages(config.ghpOptions));
});