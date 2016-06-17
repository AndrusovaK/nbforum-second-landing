/* Main watcher */
var gulp = require('gulp'),
    config = require('./config');

gulp.task('watch', ['webserver'],function() {
    gulp.watch(config.pathTo.Src.Styles, ['css']);
    gulp.watch(config.pathTo.Src.MainHtmlFile, ['html']);
    gulp.watch(config.pathTo.Src.Images, ['images']);
    gulp.watch('bower.json', ['bower']);
    gulp.watch(config.pathTo.Src.Txt, ['txt']);
    gulp.watch(config.pathTo.Src.JS, ['js']);
    gulp.watch(config.pathTo.Src.Fonts, ['fonts']);
});