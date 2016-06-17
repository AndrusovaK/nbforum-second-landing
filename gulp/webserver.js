/* BrowserSync local web server*/
var gulp = require('gulp'),
    config = require('./config'),
    browserSync = require("browser-sync");

gulp.task('webserver', ['build'], function () {
    browserSync(config.browserSync);
});